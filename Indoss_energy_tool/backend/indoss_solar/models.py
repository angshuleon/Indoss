# file: models.py
from dataclasses import dataclass
from typing import Optional, List


@dataclass
class TariffStructure:
    """
    Generic HT/LT tariff structure (single-block for now).
    Extend later with ToD blocks if needed.
    """
    name: str
    energy_rate_inr_per_kwh: float              # base energy charge (₹/kWh)
    demand_rate_inr_per_kva: float = 0.0        # ₹/kVA per month
    wheeling_inr_per_kwh: float = 0.0           # ₹/kWh
    fixed_monthly_inr: float = 0.0              # ₹/month
    electricity_duty_pct: float = 0.0           # % on applicable charges
    other_surcharge_pct: float = 0.0            # additional % on applicable charges
    
    
@dataclass
class SolarInput:
    """
    Core inputs for a simple rooftop solar benefits calculation.
    """
    location: str                 # e.g. "Guwahati"
    region: str                   # e.g. "North-East"
    consumer_type: str            # "Residential" | "Commercial" | "Institutional"
    monthly_bill_inr: float       # average monthly electricity bill (₹)
    roof_area_m2: Optional[float] = None  # available roof area, if known
    preference: str = "balanced"  # "lowest_capex" | "max_savings" | "balanced"
    analysis_years: int = 25      # lifetime for financial analysis
    
    # Demand-related inputs (more relevant for HT / bus depot style consumers)
    contract_demand_kva: Optional[float] = None
    peak_demand_without_solar_kva: Optional[float] = None
    demand_reduction_fraction_with_solar: float = 0.0  # 0–1, fraction of demand reduced by solar

    # Detailed tariff; if None, engine will create a simple default
    tariff: Optional[TariffStructure] = None
    
    # NEW: metering scheme
    # "behind_meter" | "net" | "gross"
    metering_mode: str = "behind_meter"

    # NEW: feed-in tariff (FiT) for exports (₹/kWh)
    feed_in_tariff_inr_per_kwh: Optional[float] = None

    # NEW: for net metering – fraction of solar generation used onsite
    # (0.7 means 70% self-consumed, 30% exported)
    self_consumption_fraction: float = 0.7


@dataclass
class YearlyCashflow:
    year: int
    energy_from_solar_kwh: float
    savings_inr: float
    net_cashflow_inr: float
    cumulative_cashflow_inr: float


@dataclass
class SolarResult:
    """
    Output of the core model.
    """
    system_size_kw: float
    annual_generation_kwh: float
    annual_savings_inr: float
    total_capex_inr: float
    simple_payback_years: Optional[float]
    co2_avoided_tonnes_per_year: float
    cashflow: List[YearlyCashflow]
    assumptions: dict
