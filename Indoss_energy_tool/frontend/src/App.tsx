import { useEffect, useState } from "react";
import indossLogo from "./assets/indoss_logo.jpg";
import { Routes, Route, useNavigate } from "react-router-dom";
import { formatCurrency } from "./utils/formatCurrency";
import { GenerationChart } from "./components/GenerationChart";
import { SavingsChart } from "./components/SavingsChart";
import { calculateSolar } from "./utils/api";




type MeteringMode = "behind_meter" | "net" | "gross";

interface FormState {
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

interface Result {
  systemSizeKw: number;
  annualGenKwh: number;
  annualSavings: number;
  capex: number;
  paybackYears: number | null;
  co2Tonnes: number;
  cashflow: {
    year: number;
    gen: number;
    savings: number;
    cumulative: number;
  }[];
}

// ---------- core calculator ----------
// function computeMockResults(form: FormState): Result {
//   const specificYield = 1450;
//   const capexPerKw = form.consumerType === "Residential" ? 55000 : 50000;
//   const tariff = form.consumerType === "Residential" ? 7 : 8.5;
//   const degradation = 0.005;
//   const escal = 0.03;
//   const ef = 0.7;

//   const yearlyKwh = (form.monthlyBill / tariff) * 12;
//   let sizeKw = (yearlyKwh / specificYield) * 0.85;
//   sizeKw = Math.min(sizeKw, form.roofArea * 0.15);
//   sizeKw = Math.max(1, Math.round(sizeKw * 10) / 10);

//   const annualGen = sizeKw * specificYield;

//   let annualSavings: number;
//   if (form.meteringMode === "gross") {
//     annualSavings = annualGen * form.feedInTariff;
//   } else if (form.meteringMode === "net") {
//     const selfUse = annualGen * form.selfConsumption;
//     const exportKwh = annualGen - selfUse;
//     annualSavings =
//       selfUse * tariff + exportKwh * (form.feedInTariff || tariff);
//   } else {
//     annualSavings = annualGen * tariff;
//   }

//   const capex = sizeKw * capexPerKw;

//   const cashflow: Result["cashflow"] = [];
//   let cumulative = -capex;
//   let payback: number | null = null;

//   for (let y = 1; y <= form.analysisYears; y++) {
//     const gen = annualGen * Math.pow(1 - degradation, y - 1);
//     const savings = annualSavings * Math.pow(1 + escal, y - 1);
//     cumulative += savings;
//     if (!payback && cumulative >= 0) payback = y;

//     cashflow.push({ year: y, gen, savings, cumulative });
//   }

//   const co2Tonnes = (annualGen * ef) / 1000;

//   return {
//     systemSizeKw: sizeKw,
//     annualGenKwh: annualGen,
//     annualSavings,
//     capex,
//     paybackYears: payback,
//     co2Tonnes,
//     cashflow,
//   };
// }

// function formatCurrency(v: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(v);
// }

/* ---------------- SPLASH PAGE (at path "/") ---------------- */

function SplashScreenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A3F40] via-[#0A3F40]/95 to-[#8DB1B2]">
      <div className="flex flex-col items-center gap-5 text-center px-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 px-10 py-8 shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <img
              src={indossLogo}
              alt="Indoss Energy"
              className="h-16 w-auto object-contain rounded-xl shadow-md border border-white/30"
            />
            <div className="space-y-1">
              <div className="font-display text-2xl tracking-wide text-white">
                INDOSS Energy
              </div>
              <div className="text-xs tracking-[0.18em] text-white/70">
                SOLAR BENEFITS STUDIO
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/tool")}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F6921E] text-[#232323] text-xs font-semibold px-5 py-2 shadow-lg hover:bg-[#f8a63f] transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Enter the tool
          <span className="text-[14px]">↦</span>
        </button>

        <p className="text-[11px] text-white/70">
          Start exploring your renewable energy benefits with transparent,
          engineering-grade estimates.
        </p>
      </div>
    </div>
  );
}


// ---------- Main Tool UI ----------
function SolarToolApp() {
  const [form, setForm] = useState<FormState>({
    location: "Guwahati",
    region: "North-East",
    consumerType: "Residential",
    monthlyBill: 3000,
    roofArea: 80,
    analysisYears: 25,
    meteringMode: "behind_meter",
    selfConsumption: 0.7,
    feedInTariff: 4,
  });

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof FormState) =>
    (value: string | number) =>
      setForm((f) => ({ ...f, [field]: value as any }));

  const isNet = form.meteringMode === "net";
  const isGross = form.meteringMode === "gross";

  useEffect(() => {
    let cancelled = false;

    async function fetchResult() {
      setLoading(true);
      setError(null);
      try {
        const res = await calculateSolar(form);
        if (!cancelled) setResult(res);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("Could not reach backend, using local estimate.");
          // optional: fallback to your old mock calculator
          // setResult(computeMockResults(form));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchResult();
    return () => {
      cancelled = true;
    };
  }, [form]);

  if (result === null) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F7F7]">
    
      <div className="text-sm text-[#232323]/70">
        {loading ? "Calculating your solar benefits..." : "Waiting for backend..."}
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7F7] via-white to-[#8DB1B2]/20">
      {/* HEADER */}
      <header className="border-b border-[#0A3F40]/10 bg-white/90 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={indossLogo}
              alt="Indoss Logo"
              className="h-10 w-auto object-contain rounded-xl shadow-sm border border-[#0A3F40]/10"
            />
            <div>
              <div className="font-display text-lg tracking-wide text-[#0A3F40]">
                INDOSS Energy
              </div>
              <div className="text-xs tracking-[0.16em] text-[#232323]/60">
                SOLAR BENEFITS STUDIO
              </div>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#0A3F40]/15 bg-[#0A3F40]/5 px-3 py-1 text-[11px] text-[#0A3F40] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F6921E]" />
            Transparent • Local • Trusted
          </span>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 py-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        {/* LEFT: INPUTS */}
        <section className="bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-5 lg:p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[#232323]">
              Your property & usage
            </h2>
            <p className="text-xs text-[#232323]/60 mt-1">
              Adjust these to match your site. Estimates refresh instantly.
            </p>
          </div>

          {/* Property + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <label className="font-medium text-[#232323]/80">
                Property type
              </label>
              <select
                value={form.consumerType}
                onChange={(e) => update("consumerType")(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F6921E]/60"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Institutional</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-[#232323]/80">Location</label>
              <select
                value={form.location}
                onChange={(e) => update("location")(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F6921E]/60"
              >
                <option>Guwahati</option>
                <option>Dibrugarh</option>
                <option>Silchar</option>
                <option>Other (NE)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-[#232323]/80">Region</label>
              <select
                value={form.region}
                onChange={(e) => update("region")(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F6921E]/60"
              >
                <option>North-East</option>
                <option>North</option>
                <option>East</option>
                <option>West</option>
                <option>South</option>
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            {/* Bill */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#232323]/80">
                  Monthly electricity bill
                </span>
                <span className="font-semibold text-[#0A3F40]">
                  {formatCurrency(form.monthlyBill)}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={form.monthlyBill}
                onChange={(e) => update("monthlyBill")(+e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-[#232323]/45 mt-0.5">
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Roof area */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#232323]/80">
                  Usable roof area
                </span>
                <span className="font-semibold text-[#0A3F40]">
                  {form.roofArea} m²
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={5}
                value={form.roofArea}
                onChange={(e) => update("roofArea")(+e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-[#232323]/45 mt-0.5">
                <span>10 m²</span>
                <span>500 m²</span>
              </div>
            </div>

            {/* Analysis years */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#232323]/80">
                  Analysis horizon
                </span>
                <span className="font-semibold text-[#0A3F40]">
                  {form.analysisYears} years
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={30}
                step={1}
                value={form.analysisYears}
                onChange={(e) => update("analysisYears")(+e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-[#232323]/45 mt-0.5">
                <span>10 years</span>
                <span>30 years</span>
              </div>
            </div>
          </div>

          {/* Metering & export */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-[#232323]/80 mb-1.5">
              Metering & export
            </h3>
            <p className="text-[11px] text-[#232323]/55 mb-3">
              Select how your DISCOM accounts for solar export.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#232323]/80">
                  Metering mode
                </label>
                <select
                  value={form.meteringMode}
                  onChange={(e) => update("meteringMode")(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F6921E]/60"
                >
                  <option value="behind_meter">Behind-the-meter</option>
                  <option value="net">Net metering</option>
                  <option value="gross">Gross metering</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#232323]/80">
                  Feed-in tariff (FiT)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step={0.1}
                    min={0}
                    value={form.feedInTariff}
                    onChange={(e) => update("feedInTariff")(+e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#F6921E]/60"
                  />
                  <span className="text-[11px] text-[#232323]/60">₹/kWh</span>
                </div>
              </div>
            </div>

            {isNet && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-[#232323]/80">
                    Self-consumption of solar
                  </span>
                  <span className="font-semibold text-[#0A3F40]">
                    {Math.round(form.selfConsumption * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={1}
                  step={0.05}
                  value={form.selfConsumption}
                  onChange={(e) =>
                    update("selfConsumption")(parseFloat(e.target.value))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-[#232323]/45 mt-0.5">
                  <span>More export</span>
                  <span>More self-use</span>
                </div>
              </div>
            )}

            {isGross && (
              <p className="mt-3 text-[11px] text-[#232323]/60">
                In gross metering, your entire solar generation is exported at
                the FiT, while consumption is billed separately.
              </p>
            )}
          </div>
        </section>

        {/* RIGHT: RESULTS */}
        <section className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-4 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#232323]/60">
                Recommended system
              </span>
              <span className="text-2xl font-semibold text-[#0A3F40]">
                {result.systemSizeKw.toFixed(1)} kW
              </span>
              <span className="text-[11px] text-[#232323]/55">
                Sized from your bill & roof. Final design after site visit.
              </span>
            </div>

            <div className="bg-gradient-to-br from-[#F6921E] via-[#EFDCA2] to-[#FFE6B8] rounded-3xl shadow-md p-4 relative overflow-hidden">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#232323]/70">
                Estimated savings / year
              </span>
              <span className="text-2xl font-semibold text-[#232323] mt-1 block">
                {formatCurrency(result.annualSavings)}
              </span>
              <span className="text-[11px] text-[#232323]/70">
                Simple payback:{" "}
                {result.paybackYears ? `${result.paybackYears} years` : "N/A"}
              </span>
              <div className="absolute -right-10 -bottom-10 h-20 w-20 rounded-full border border-white/40" />
              <div className="absolute right-0 -bottom-16 h-24 w-24 rounded-full border border-white/40" />
            </div>

            <div className="bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-4 flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#232323]/60">
                Climate impact
              </span>
              <span className="text-xl font-semibold text-[#0A3F40]">
                {result.co2Tonnes.toFixed(2)} tCO₂ / yr
              </span>
              <span className="text-[11px] text-[#232323]/55">
                ≈{" "}
                <span className="font-semibold">
                  {Math.round(result.co2Tonnes * 45)} trees
                </span>{" "}
                growing for a year.
              </span>
            </div>
          </div>

          {/* Cashflow */}
          <div className="bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-5 lg:p-6">
            <div className="flex justify-between items-center gap-4 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-[#232323]">
                  {form.analysisYears}-year cashflow preview
                </h3>
                <p className="text-[11px] text-[#232323]/60">
                  Includes PV degradation, tariff escalation and cumulative
                  payback.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-[11px] text-[#232323]/65">
                <span>
                  CAPEX:{" "}
                  <span className="font-semibold">
                    {formatCurrency(result.capex)}
                  </span>
                </span>
                <span>
                  Metering:{" "}
                  <span className="font-semibold uppercase">
                    {form.meteringMode.replace("_", " ")}
                  </span>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="min-w-full text-xs">
                <thead className="bg-[#F6F7F7]">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-[#232323]/70">
                      Year
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-[#232323]/70">
                      Gen (kWh)
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-[#232323]/70">
                      Savings (₹)
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-[#232323]/70">
                      Cumulative (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.cashflow.slice(0, 10).map((row) => (
                    <tr
                      key={row.year}
                      className="odd:bg-white even:bg-[#F9FAFB]"
                    >
                      <td className="px-3 py-1.5 text-[#232323]/85">
                        {row.year}
                      </td>
                      <td className="px-3 py-1.5 text-[#232323]/85">
                        {row.gen.toFixed(0)}
                      </td>
                      <td className="px-3 py-1.5 text-[#232323]/85">
                        {formatCurrency(row.savings)}
                      </td>
                      <td className="px-3 py-1.5 text-[#232323]/85">
                        {formatCurrency(row.cumulative)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <GenerationChart data={result.cashflow} />
                <SavingsChart data={result.cashflow} />
              </div>

            <p className="mt-3 text-[11px] text-[#232323]/60">
              This is an indicative view. For an offer, Indoss will refine these
              numbers using your actual tariff, load curve and site constraints.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- SIMPLE ABOUT + PROPOSAL PAGES ---------------- */

function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F7F7]">
      <div className="max-w-xl bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-6 space-y-3">
        <h1 className="font-display text-2xl text-[#0A3F40]">
          About INDOSS Energy
        </h1>
        <p className="text-sm text-[#232323]/80">
          INDOSS Energy is a Guwahati-based clean energy venture focused on
          honest, engineering-grade advisory for rooftop solar and advanced
          grid-interactive solutions.
        </p>
        <p className="text-sm text-[#232323]/70">
          This tool is our way of making transparent financial and climate
          benefits accessible to every consumer in the North-East and beyond.
        </p>
      </div>
    </div>
  );
}

function ProposalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F7F7]">
      <div className="max-w-xl bg-white rounded-3xl border border-[#0A3F40]/10 shadow-md p-6 space-y-3">
        <h1 className="font-display text-2xl text-[#0A3F40] mb-2">
          Proposal Generator (coming soon)
        </h1>
        <p className="text-sm text-[#232323]/75">
          Here we will generate a detailed PDF proposal with system sizing,
          savings, cashflow and Indoss branding, based on the inputs from your
          solar tool session.
        </p>
      </div>
    </div>
  );
}


// ---------- App wrapper: handles fade-out splash ----------
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreenPage />} />
      <Route path="/tool" element={<SolarToolApp />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/proposal" element={<ProposalPage />} />
    </Routes>
  );
}

