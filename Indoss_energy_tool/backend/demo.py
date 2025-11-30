# file: demo.py

from indoss_solar.models import SolarInput, TariffStructure
from indoss_solar.engine import calculate_solar_benefits


def main():
    # Simple LT residential-style default tariff (just for testing)
    default_tariff = TariffStructure(
        name="Test-Residential",
        energy_rate_inr_per_kwh=7.0,
        demand_rate_inr_per_kva=80.0,
        wheeling_inr_per_kwh=2.0,
        fixed_monthly_inr=0.0,
        electricity_duty_pct=8,
        other_surcharge_pct=2.0,
    )

    inp = SolarInput(
        location="Guwahati",
        region="North-East",
        consumer_type="Residential",
        monthly_bill_inr=4000.0,      # current bill
        roof_area_m2=60.0,            # 60 m² roof
        preference="balanced",
        analysis_years=25,
        # metering config
        metering_mode="behind_meter",  # or "net" / "gross"
        feed_in_tariff_inr_per_kwh=4.0,
        self_consumption_fraction=0.7,
        tariff=default_tariff,
    )

    result = calculate_solar_benefits(inp)

    print("=== Indoss Solar Demo Result ===")
    print(f"System size (kW):              {result.system_size_kw:.2f}")
    print(f"Annual generation (kWh):       {result.annual_generation_kwh:.0f}")
    print(f"Annual savings (₹/year):       {result.annual_savings_inr:,.0f}")
    print(f"Total CAPEX (₹):               {result.total_capex_inr:,.0f}")
    print(f"Simple payback (years):        {result.simple_payback_years}")
    print(f"CO₂ avoided (tonnes/year):     {result.co2_avoided_tonnes_per_year:.2f}")

    # Show first few cashflow years for sanity
    print("\nYear  |  Gen (kWh)  |  Savings (₹)  |  Cumulative (₹)")
    print("---------------------------------------------------")
    for cf in result.cashflow[:5]:
        print(
            f"{cf.year:4d}  |  "
            f"{cf.energy_from_solar_kwh:9.0f}  |  "
            f"{cf.savings_inr:11.0f}  |  "
            f"{cf.cumulative_cashflow_inr:13.0f}"
        )


if __name__ == "__main__":
    print("Running Indoss solar demo...\n")
    main()
