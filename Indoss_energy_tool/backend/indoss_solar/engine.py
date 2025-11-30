# engine.py
from .models import SolarInput, SolarResult
from .sizing import size_system
from .solar_yield import annual_generation_kwh
from .financials import compute_capex, compute_annual_savings_from_tariff_and_metering, build_cashflow
from .emissions import compute_annual_co2_avoided_tonnes


def calculate_solar_benefits(inp: SolarInput) -> SolarResult:
    system_size_kw, sizing_debug = size_system(inp)
    annual_gen = annual_generation_kwh(system_size_kw, inp.location)

    total_capex = compute_capex(system_size_kw, inp.consumer_type)
    annual_savings, savings_debug = compute_annual_savings_from_tariff_and_metering(inp, annual_gen)

    cashflow, payback_years = build_cashflow(
        inp=inp,
        annual_gen_kwh=annual_gen,
        total_capex_inr=total_capex,
        base_annual_savings_inr=annual_savings
    )

    co2_avoided_tonnes = compute_annual_co2_avoided_tonnes(annual_gen, inp.region)

    assumptions = {
        "analysis_years": inp.analysis_years,
        "preference": inp.preference,
        "sizing_debug": sizing_debug,
        "tariff_debug": savings_debug,
        "notes": [
            f"Metering mode: {inp.metering_mode} (behind_meter / net / gross).",
            "Net/gross metering handled via FiT and self-consumption fraction.",
            "Degradation assumed 0.5% per year.",
            "Tariff escalation assumed 3% per year.",
        ],
    }

    return SolarResult(
        system_size_kw=system_size_kw,
        annual_generation_kwh=annual_gen,
        annual_savings_inr=annual_savings,
        total_capex_inr=total_capex,
        simple_payback_years=payback_years,
        co2_avoided_tonnes_per_year=co2_avoided_tonnes,
        cashflow=cashflow,
        assumptions=assumptions,
    )
