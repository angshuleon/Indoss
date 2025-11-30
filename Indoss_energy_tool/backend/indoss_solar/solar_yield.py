# file: solar_yield.py
from .location_data import get_specific_yield


def annual_generation_kwh(system_size_kw: float, location: str) -> float:
    """
    Annual generation estimate = system_size * specific_yield.
    """
    specific_yield = get_specific_yield(location)
    return system_size_kw * specific_yield
