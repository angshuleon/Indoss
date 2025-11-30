# file: sizing.py
from typing import Tuple
from .models import SolarInput
from .location_data import get_tariff, get_specific_yield


def estimate_monthly_consumption_kwh(inp: SolarInput) -> float:
    """
    Infer monthly consumption (kWh) from bill and average tariff.
    """
    tariff = get_tariff(inp.consumer_type)
    if tariff <= 0:
        raise ValueError("Tariff must be positive.")
    return inp.monthly_bill_inr / tariff


def max_kw_from_roof(roof_area_m2: float) -> float:
    """
    Simple thumb rule: ~150 W/m² of panel density.
    e.g., 10 m² -> 1.5 kW.
    """
    if roof_area_m2 <= 0:
        return 0.0
    return roof_area_m2 * 0.15  # kW


def size_system(inp: SolarInput) -> Tuple[float, dict]:
    """
    Decide system size (kW) based on:
    - Monthly consumption
    - Roof area (if provided)
    - User preference
    Returns (system_size_kw, debug_info)
    """
    monthly_kwh = estimate_monthly_consumption_kwh(inp)
    yearly_kwh = monthly_kwh * 12.0
    specific_yield = get_specific_yield(inp.location)

    # kW required to cover 100% of annual usage
    kw_for_full_coverage = yearly_kwh / specific_yield if specific_yield > 0 else 0.0

    # If user wants "max_savings", allow up to 120% of current consumption
    if inp.preference == "max_savings":
        target_fraction = 1.2
    elif inp.preference == "lowest_capex":
        target_fraction = 0.6
    else:  # "balanced"
        target_fraction = 0.8

    kw_target = kw_for_full_coverage * target_fraction

    roof_limit_kw = float("inf")
    if inp.roof_area_m2 is not None:
        roof_limit_kw = max_kw_from_roof(inp.roof_area_m2)

    # Final size = min(target, roof_limit) but at least some minimum
    system_size_kw = min(kw_target, roof_limit_kw)
    if system_size_kw == float("inf"):  # no roof constraint
        system_size_kw = kw_target

    # Reasonable bounds
    system_size_kw = max(1.0, round(system_size_kw, 1))  # min 1 kW, round to 0.1 kW

    debug = {
        "monthly_kwh_estimated": monthly_kwh,
        "yearly_kwh_estimated": yearly_kwh,
        "specific_yield": specific_yield,
        "kw_for_full_coverage": kw_for_full_coverage,
        "preference": inp.preference,
        "target_fraction_of_consumption": target_fraction,
        "kw_target_before_roof_limit": kw_target,
        "roof_limit_kw": roof_limit_kw if roof_limit_kw != float("inf") else None,
    }
    return system_size_kw, debug
