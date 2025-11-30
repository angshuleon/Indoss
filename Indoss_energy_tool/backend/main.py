# backend/main.py

from typing import List, Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from indoss_solar.models import SolarInput, TariffStructure
from indoss_solar.engine import calculate_solar_benefits

# ---------- FastAPI setup ----------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Pydantic models (match your TS interfaces) ----------

MeteringMode = Literal["behind_meter", "net", "gross"]


class FormStateIn(BaseModel):
    location: str
    region: str
    consumerType: str
    monthlyBill: float
    roofArea: float
    analysisYears: int
    meteringMode: MeteringMode
    selfConsumption: float
    feedInTariff: float


class CashflowOut(BaseModel):
    year: int
    gen: float
    savings: float
    cumulative: float


class ResultOut(BaseModel):
    systemSizeKw: float
    annualGenKwh: float
    annualSavings: float
    capex: float
    paybackYears: float | None
    co2Tonnes: float
    cashflow: List[CashflowOut]


# ---------- helper: pick a tariff from consumerType ----------

def get_default_tariff(consumer_type: str) -> TariffStructure:
    """Simple mapping – tweak these numbers later per real tariff sheets."""
    if consumer_type.lower().startswith("res"):
        return TariffStructure(
            name="Residential-Default",
            energy_rate_inr_per_kwh=7.0,
            demand_rate_inr_per_kva=80.0,
            wheeling_inr_per_kwh=2.0,
            fixed_monthly_inr=0.0,
            electricity_duty_pct=8.0,
            other_surcharge_pct=2.0,
        )
    else:  # Commercial / Institutional
        return TariffStructure(
            name="Commercial-Default",
            energy_rate_inr_per_kwh=8.5,
            demand_rate_inr_per_kva=120.0,
            wheeling_inr_per_kwh=2.0,
            fixed_monthly_inr=0.0,
            electricity_duty_pct=10.0,
            other_surcharge_pct=3.0,
        )


# ---------- endpoints ----------

@app.get("/api/ping")
def ping():
    return {"message": "Indoss solar backend is live"}


@app.post("/api/solar/calc", response_model=ResultOut)
def calc_solar(form: FormStateIn) -> ResultOut:
    """
    Take the UI FormState, convert to SolarInput, run your core engine,
    and map back to the frontend Result shape.
    """

    tariff = get_default_tariff(form.consumerType)

    solar_input = SolarInput(
        location=form.location,
        region=form.region,
        consumer_type=form.consumerType,
        monthly_bill_inr=form.monthlyBill,
        roof_area_m2=form.roofArea,
        preference="balanced",  # could also be a field in the UI later
        analysis_years=form.analysisYears,
        metering_mode=form.meteringMode,
        feed_in_tariff_inr_per_kwh=form.feedInTariff,
        self_consumption_fraction=form.selfConsumption,
        tariff=tariff,
    )

    result = calculate_solar_benefits(solar_input)

    cashflow_out = [
        CashflowOut(
            year=cf.year,
            gen=cf.energy_from_solar_kwh,
            savings=cf.savings_inr,
            cumulative=cf.cumulative_cashflow_inr,
        )
        for cf in result.cashflow
    ]

    return ResultOut(
        systemSizeKw=result.system_size_kw,
        annualGenKwh=result.annual_generation_kwh,
        annualSavings=result.annual_savings_inr,
        capex=result.total_capex_inr,
        paybackYears=result.simple_payback_years,
        co2Tonnes=result.co2_avoided_tonnes_per_year,
        cashflow=cashflow_out,
    )
