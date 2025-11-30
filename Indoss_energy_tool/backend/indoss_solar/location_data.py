# file: location_data.py
from typing import Dict


# kWh/kW/year – VERY rough placeholders, replace with real PV data later
SPECIFIC_YIELD_KWH_PER_KW_YEAR: Dict[str, float] = {
    "Guwahati": 1450.0,
    "Dibrugarh": 1400.0,
    "Silchar": 1350.0,
    "Default": 1400.0,
}

# Average effective retail tariff (₹/kWh) – placeholder values
TARIFF_INR_PER_KWH: Dict[str, float] = {
    "Residential": 7.0,
    "Commercial": 8.5,
    "Institutional": 8.0,
}

# Benchmark installed cost in ₹/kW – realistic ranges for rooftop
CAPEX_INR_PER_KW: Dict[str, float] = {
    "Residential": 55000.0,
    "Commercial": 50000.0,
    "Institutional": 52000.0,
}

# Regional grid emission factor (tonnes CO2 per MWh) – rough factors
# Convert to kg/kWh when using.
EMISSION_FACTOR_TONNES_PER_MWH: Dict[str, float] = {
    "North-East": 0.7,  # 0.7 t/MWh = 0.7 kg/kWh
    "East": 0.85,
    "West": 0.9,
    "North": 0.85,
    "South": 0.8,
    "Default": 0.8,
}


def get_specific_yield(location: str) -> float:
    return SPECIFIC_YIELD_KWH_PER_KW_YEAR.get(location, SPECIFIC_YIELD_KWH_PER_KW_YEAR["Default"])


def get_tariff(consumer_type: str) -> float:
    return TARIFF_INR_PER_KWH.get(consumer_type, TARIFF_INR_PER_KWH["Residential"])


def get_capex_per_kw(consumer_type: str) -> float:
    return CAPEX_INR_PER_KW.get(consumer_type, CAPEX_INR_PER_KW["Residential"])


def get_emission_factor_kg_per_kwh(region: str) -> float:
    tonnes_per_mwh = EMISSION_FACTOR_TONNES_PER_MWH.get(region, EMISSION_FACTOR_TONNES_PER_MWH["Default"])
    # 1 MWh = 1000 kWh, 1 tonne = 1000 kg -> tonnes/MWh == kg/kWh
    return tonnes_per_mwh  # numerically same as kg/kWh
