// frontend/src/utils/api.ts

export type MeteringMode = "behind_meter" | "net" | "gross";

export interface FormState {
  location: string;
  region: string;
  consumerType: string;
  monthlyBill: number;
  roofArea: number;
  analysisYears: number;
  meteringMode: MeteringMode;
  selfConsumption: number;
  feedInTariff: number;
}

export interface CashflowRow {
  year: number;
  gen: number;
  savings: number;
  cumulative: number;
}

export interface Result {
  systemSizeKw: number;
  annualGenKwh: number;
  annualSavings: number;
  capex: number;
  paybackYears: number | null;
  co2Tonnes: number;
  cashflow: CashflowRow[];
}

export async function calculateSolar(form: FormState): Promise<Result> {
  const res = await fetch("/api/solar/calc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error(`Backend error ${res.status}`);
  }
  return res.json();
}
