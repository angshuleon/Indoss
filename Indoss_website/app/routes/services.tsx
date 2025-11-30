// app/routes/services.tsx
import { useState } from "react";

const serviceTabs = [
  {
    id: "epc",
    label: "Solar EPC",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    title: "Solar EPC · Rooftop & ground-mounted",
    intro:
      "End-to-end design and implementation of solar plants for homes, institutions and commercial/industrial consumers in Assam and neighbouring states.",
    bullets: [
      "Site assessment, shading analysis and load understanding",
      "Technical + financial sizing with payback estimates",
      "Design tuned for monsoon, floods and grid constraints",
      "Coordination for net-metering and statutory approvals",
      "Commissioning, documentation and training for staff",
    ],
    highlight:
      "We avoid oversizing for the sake of higher project values—our goal is a system that performs as promised and is easy to maintain.",
  },
  {
    id: "microgrid",
    label: "Microgrids",
    image:
      "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=900&q=80",
    title: "Microgrid & critical-load systems",
    intro:
      "Decentralised solar + storage systems for remote villages, tea estates, health centres and schools—especially in flood-prone and hard-to-reach areas.",
    bullets: [
      "DC/AC microgrid design for households and small enterprises",
      "Critical-load backup for clinics, schools and relief centres",
      "Battery sizing for real usage patterns, not ideal scenarios",
      "Remote monitoring and fault alerts where connectivity allows",
      "Training local operators and setting clear O&M routines",
    ],
    highlight:
      "Our microgrid work is designed to complement public schemes and community initiatives, not compete with them.",
  },
  {
    id: "advisory",
    label: "Advisory & consulting",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    title: "Technical advisory & policy support",
    intro:
      "Research-driven advisory for DISCOMs, urban bodies, regulators and mission-driven organisations working on distributed renewables and EV charging.",
    bullets: [
      "Load estimation and grid-impact studies for EV charging",
      "Tariff and ToD analysis for solar + EV deployments",
      "Designing pilot projects and evaluation frameworks",
      "Preparing technical reports, toolkits and training material",
      "Capacity-building workshops for field and planning teams",
    ],
    highlight:
      "We translate detailed models and simulations into clear, actionable recommendations for decision makers and field engineers.",
  },
];

const processSteps = [
  {
    title: "01 · Understand",
    text: "Site visit, data collection and clarity on constraints and goals.",
  },
  {
    title: "02 · Design",
    text: "Iterative technical + financial design shared transparently.",
  },
  {
    title: "03 · Implement",
    text: "Procurement, installation and commissioning with clear dates.",
  },
  {
    title: "04 · Hand over",
    text: "Training, documentation and an agreed O&M and support plan.",
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState("epc");
  const current = serviceTabs.find((t) => t.id === active)!;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-[-6rem] h-72 w-72 rounded-full bg-gradient-to-br from-indoss-orange/70 to-indoss-aqua/70 blur-[120px]" />

      <section className="section pt-10 pb-16 lg:pt-14 lg:pb-20 space-y-10">
        {/* header */}
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] tracking-[0.3em] uppercase text-indoss-charcoal/60">
            Services
          </p>
          <h1 className="text-3xl lg:text-4xl font-semibold">
            What we deliver today.
          </h1>
          <p className="text-sm sm:text-base text-indoss-charcoal/80">
            Indoss starts with delivering reliable solar projects and microgrids
            in Assam and neighbouring states—building the technical and
            financial base for more advanced work in flexibility, EV charging
            and analytics.
          </p>
        </div>

        {/* tabs */}
        <div className="rounded-full bg-white/80 border border-white/80 inline-flex p-1 gap-1">
          {serviceTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                active === tab.id
                  ? "bg-indoss-teal text-white shadow-soft"
                  : "text-indoss-charcoal/70 hover:bg-indoss-mist"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr,1fr] items-start">
          {/* left text */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-indoss-charcoal">
              {current.title}
            </h2>
            <p className="text-sm sm:text-base text-indoss-charcoal/85">
              {current.intro}
            </p>
            <ul className="space-y-2 text-sm text-indoss-charcoal/85">
              {current.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <p className="text-[13px] text-indoss-charcoal/70 border-l-2 border-indoss-orange/70 pl-3">
              {current.highlight}
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] text-indoss-charcoal/75">
              <span className="rounded-full bg-indoss-mist px-3 py-1">
                Detailed design
              </span>
              <span className="rounded-full bg-indoss-mist px-3 py-1">
                Honest payback numbers
              </span>
              <span className="rounded-full bg-indoss-mist px-3 py-1">
                Local execution
              </span>
            </div>
          </div>

          {/* right image card */}
          <div className="gradient-border rounded-3xl p-[2px]">
            <div className="glass-card rounded-3xl overflow-hidden hover-glow">
              <img
                src={current.image}
                alt={current.label}
                className="h-52 w-full object-cover"
              />
              <div className="p-4 text-[12px] text-indoss-charcoal/80">
                Visuals are indicative. Replace with real project photos or
                schematics from Indoss installations as the portfolio grows.
              </div>
            </div>
          </div>
        </div>

        {/* simple process strip */}
        <div className="mt-6 rounded-3xl bg-white border border-white/80 p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-indoss-charcoal/60 mb-4">
            How a typical project flows
          </p>
          <div className="grid gap-4 md:grid-cols-4 text-[13px] text-indoss-charcoal/80">
            {processSteps.map((step) => (
              <div key={step.title} className="hover-glow rounded-2xl p-3">
                <p className="font-semibold text-indoss-charcoal mb-1">
                  {step.title}
                </p>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-indoss-charcoal/60">
            For larger or more complex sites, we document each step formally so
            institutions, boards and funding agencies have clear visibility.
          </p>
        </div>
      </section>
    </div>
  );
}
