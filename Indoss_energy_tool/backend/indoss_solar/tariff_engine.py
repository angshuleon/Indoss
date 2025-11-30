# file: tariff_engine.py
from typing import Dict, Tuple
from .models import TariffStructure


def compute_monthly_bill(
    consumption_kwh: float,
    billing_demand_kva: float,
    tariff: TariffStructure,
    solar_gen_kwh: float = 0.0,
    demand_reduction_fraction: float = 0.0,
) -> Tuple[float, Dict[str, float]]:
    """
    Compute monthly bill with full component breakdown.

    Parameters
    ----------
    consumption_kwh : float
        Total monthly energy drawn at the meter without solar.
    billing_demand_kva : float
        Contract/billing demand (or peak demand considered for tariff).
    tariff : TariffStructure
        Tariff definition (energy, demand, wheeling, duty, etc).
    solar_gen_kwh : float
        Monthly solar generation used behind-the-meter to offset energy.
    demand_reduction_fraction : float
        Fraction of billing demand reduced due to solar (0–1). For many rooftop
        LT consumers this is ~0; for smart bus depots it can be >0 if solar
        reliably shaves peaks.

    Returns
    -------
    total_bill_inr : float
    components : dict
        Dict containing each component for transparency.
    """
    solar_offset_kwh = min(consumption_kwh, solar_gen_kwh)
    net_grid_kwh = max(consumption_kwh - solar_offset_kwh, 0.0)

    # Energy-related components
    energy_cost = net_grid_kwh * tariff.energy_rate_inr_per_kwh
    wheeling_cost = net_grid_kwh * tariff.wheeling_inr_per_kwh

    # Demand-related components
    effective_demand_kva = max(
        billing_demand_kva * (1.0 - demand_reduction_fraction), 0.0
    )
    demand_cost = effective_demand_kva * tariff.demand_rate_inr_per_kva

    fixed_cost = tariff.fixed_monthly_inr

    # Subtotal before duties/surcharges
    subtotal = energy_cost + wheeling_cost + demand_cost + fixed_cost

    electricity_duty = subtotal * (tariff.electricity_duty_pct / 100.0)
    other_surcharge = subtotal * (tariff.other_surcharge_pct / 100.0)

    total = subtotal + electricity_duty + other_surcharge

    components = {
        "consumption_kwh": consumption_kwh,
        "solar_offset_kwh": solar_offset_kwh,
        "net_grid_kwh": net_grid_kwh,
        "effective_demand_kva": effective_demand_kva,
        "energy_cost_inr": energy_cost,
        "wheeling_cost_inr": wheeling_cost,
        "demand_cost_inr": demand_cost,
        "fixed_cost_inr": fixed_cost,
        "subtotal_inr": subtotal,
        "electricity_duty_inr": electricity_duty,
        "other_surcharge_inr": other_surcharge,
        "total_bill_inr": total,
    }

    return total, components
