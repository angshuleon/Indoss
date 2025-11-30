# file: indoss_solar/financials.py

from typing import List, Tuple

from .models import SolarInput, YearlyCashflow, TariffStructure
from .location_data import get_capex_per_kw, get_tariff
from .tariff_engine import compute_monthly_bill


def build_default_tariff(inp: SolarInput) -> TariffStructure:
    """
    If the user hasn't provided a detailed TariffStructure, build a simple one
    using average energy rate from location_data and assume other components = 0.
    """
    avg_energy_rate = get_tariff(inp.consumer_type)
    return TariffStructure(
        name=f"Default-{inp.consumer_type}",
        energy_rate_inr_per_kwh=avg_energy_rate,
        demand_rate_inr_per_kva=0.0,
        wheeling_inr_per_kwh=0.0,
        fixed_monthly_inr=0.0,
        electricity_duty_pct=0.0,
        other_surcharge_pct=0.0,
    )


def compute_capex(system_size_kw: float, consumer_type: str) -> float:
    """
    Simple CAPEX = size * ₹/kW (by consumer type).
    """
    capex_per_kw = get_capex_per_kw(consumer_type)
    return system_size_kw * capex_per_kw


def _estimate_monthly_consumption_from_bill(inp: SolarInput, tariff: TariffStructure) -> float:
    """
    Rough inversion:
        monthly_bill ≈ consumption_kWh * energy_rate

    For proper HT cases you can override this logic by passing an explicit
    consumption to a higher-level function in future versions.
    """
    eff_rate = tariff.energy_rate_inr_per_kwh or get_tariff(inp.consumer_type)
    if eff_rate <= 0:
        raise ValueError("Effective energy rate must be positive.")
    return inp.monthly_bill_inr / eff_rate


def compute_annual_savings_from_tariff_and_metering(
    inp: SolarInput,
    annual_gen_kwh: float,
) -> Tuple[float, dict]:
    """
    Compute annual savings/benefits considering:
    - full tariff structure (energy, demand, wheeling, duty, etc.), and
    - metering scheme: behind-meter, net metering, or gross metering.

    Returns
    -------
    base_annual_savings_inr : float
        Annual monetary benefit (₹/year) to feed into cashflow.
    debug : dict
        Detailed breakdown useful for debugging and UI transparency.
    """
    tariff = inp.tariff or build_default_tariff(inp)
    metering_mode = (inp.metering_mode or "behind_meter").lower()

    # Estimate consumption from current bill
    monthly_consumption_kwh = _estimate_monthly_consumption_from_bill(inp, tariff)
    monthly_gen_kwh = annual_gen_kwh / 12.0

    billing_demand_kva = inp.contract_demand_kva or inp.peak_demand_without_solar_kva or 0.0

    # ---- Baseline (no solar) ----
    baseline_monthly_bill, baseline_components = compute_monthly_bill(
        consumption_kwh=monthly_consumption_kwh,
        billing_demand_kva=billing_demand_kva,
        tariff=tariff,
        solar_gen_kwh=0.0,
        demand_reduction_fraction=0.0,
    )

    # ---- With solar (three metering modes) ----
    if metering_mode == "gross":
        # Load is billed as before, all solar exported at FiT
        with_solar_monthly_bill = baseline_monthly_bill

        fit = inp.feed_in_tariff_inr_per_kwh or tariff.energy_rate_inr_per_kwh
        solar_revenue_monthly = monthly_gen_kwh * fit

        monthly_savings = solar_revenue_monthly
        with_solar_components = {
            "mode": "gross",
            "load_bill_inr": with_solar_monthly_bill,
            "solar_export_kwh": monthly_gen_kwh,
            "feed_in_tariff_inr_per_kwh": fit,
            "solar_revenue_inr": solar_revenue_monthly,
        }

    elif metering_mode == "net":
        # Split solar into self-consumed and exported
        sc_frac = min(max(inp.self_consumption_fraction, 0.0), 1.0)
        self_use_kwh = monthly_gen_kwh * sc_frac
        export_kwh = monthly_gen_kwh - self_use_kwh

        # Self-consumed portion reduces import
        with_solar_monthly_bill_raw, bill_components = compute_monthly_bill(
            consumption_kwh=monthly_consumption_kwh,
            billing_demand_kva=billing_demand_kva,
            tariff=tariff,
            solar_gen_kwh=self_use_kwh,
            demand_reduction_fraction=inp.demand_reduction_fraction_with_solar,
        )

        # Export credited at FiT
        fit = inp.feed_in_tariff_inr_per_kwh or tariff.energy_rate_inr_per_kwh
        export_credit_inr = export_kwh * fit

        net_payable = max(with_solar_monthly_bill_raw - export_credit_inr, 0.0)
        monthly_savings = baseline_monthly_bill - net_payable

        with_solar_components = {
            "mode": "net",
            "self_consumption_fraction": sc_frac,
            "self_use_kwh": self_use_kwh,
            "export_kwh": export_kwh,
            "raw_bill_with_self_use_inr": with_solar_monthly_bill_raw,
            "export_credit_inr": export_credit_inr,
            "net_payable_inr": net_payable,
            "baseline_bill_inr": baseline_monthly_bill,
            "bill_components_before_export": bill_components,
        }

    else:
        # Default: behind-the-meter – all gen treated as onsite offset
        with_solar_monthly_bill, bill_components = compute_monthly_bill(
            consumption_kwh=monthly_consumption_kwh,
            billing_demand_kva=billing_demand_kva,
            tariff=tariff,
            solar_gen_kwh=monthly_gen_kwh,
            demand_reduction_fraction=inp.demand_reduction_fraction_with_solar,
        )
        monthly_savings = baseline_monthly_bill - with_solar_monthly_bill

        with_solar_components = {
            "mode": "behind_meter",
            "solar_used_kwh": monthly_gen_kwh,
            "baseline_bill_inr": baseline_monthly_bill,
            "with_solar_bill_inr": with_solar_monthly_bill,
            "bill_components_with_solar": bill_components,
        }

    annual_savings = monthly_savings * 12.0

    debug = {
        "tariff_name": tariff.name,
        "metering_mode": metering_mode,
        "monthly_consumption_kwh_estimated": monthly_consumption_kwh,
        "monthly_gen_kwh": monthly_gen_kwh,
        "billing_demand_kva": billing_demand_kva,
        "baseline_monthly_bill_inr": baseline_monthly_bill,
        "with_solar_monthly_savings_inr": monthly_savings,
        "baseline_components": baseline_components,
        "with_solar_detail": with_solar_components,
    }

    return annual_savings, debug


def build_cashflow(
    inp: SolarInput,
    annual_gen_kwh: float,
    total_capex_inr: float,
    base_annual_savings_inr: float,
    degradation_rate: float = 0.005,       # 0.5% per year
    tariff_escalation_rate: float = 0.03   # 3% p.a. growth in savings
) -> Tuple[List[YearlyCashflow], float]:
    """
    Build a simple N-year cashflow using:
      - base_annual_savings_inr from tariff + metering logic (year 1),
      - generation degradation,
      - tariff escalation on monetary savings.

    Returns list of YearlyCashflow and the simple payback year (or None).
    """
    years = inp.analysis_years
    cashflows: List[YearlyCashflow] = []
    cumulative = -total_capex_inr  # CAPEX at year 0

    payback_year = None

    for year in range(1, years + 1):
        gen_this_year = annual_gen_kwh * ((1 - degradation_rate) ** (year - 1))
        savings_this_year = base_annual_savings_inr * ((1 + tariff_escalation_rate) ** (year - 1))

        net = savings_this_year
        cumulative += net

        if payback_year is None and cumulative >= 0:
            payback_year = year

        cashflows.append(
            YearlyCashflow(
                year=year,
                energy_from_solar_kwh=gen_this_year,
                savings_inr=savings_this_year,
                net_cashflow_inr=net,
                cumulative_cashflow_inr=cumulative,
            )
        )

    return cashflows, float(payback_year) if payback_year is not None else None
