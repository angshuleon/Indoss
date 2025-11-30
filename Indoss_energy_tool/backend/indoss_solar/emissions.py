# file: emissions.py
from .location_data import get_emission_factor_kg_per_kwh


def compute_annual_co2_avoided_tonnes(
    annual_gen_kwh: float,
    region: str
) -> float:
    """
    CO2 avoided = generation * grid emission factor.
    Emission factor is kg CO2 / kWh, convert to tonnes.
    """
    ef_kg_per_kwh = get_emission_factor_kg_per_kwh(region)
    kg = annual_gen_kwh * ef_kg_per_kwh
    tonnes = kg / 1000.0
    return tonnes
