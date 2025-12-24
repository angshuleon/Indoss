// app/routes/about.tsx
export default function AboutPage() {
  const milestones = [
    {
      year: "2024–25",
      title: "Starting with solar EPC",
      text: "Indoss is set up in Assam as a solar EPC and microgrid-focused company, with an emphasis on honest sizing and quality execution.",
    },
    {
      year: "Next 3–5 years",
      title: "Microgrids & resilience",
      text: "We expand into decentralised microgrids and critical-load systems in remote and flood-prone areas across the North-East.",
    },
    {
      year: "Long term",
      title: "Flexible, data-driven energy",
      text: "We build tools, analytics and services that connect EVs, microgrids and the grid to support a climate-resilient North-East.",
    },
  ];

  const pillars = [
    {
      title: "Design grounded in reality",
      text: "Site visits, load analysis and climate-conscious design instead of copy-paste sizing from templates.",
      icon: "📐",
    },
    {
      title: "Execution with accountability",
      text: "Clear timelines, transparent communication and local teams that don’t disappear after commissioning.",
      icon: "🤝",
    },
    {
      title: "Support that stays",
      text: "Remote monitoring where needed, periodic checks and clear escalation paths for any issues.",
      icon: "🌱",
    },
  ];

    return (
    <div className="relative overflow-hidden">
      {/* background accent */}
      <div className="pointer-events-none absolute -top-32 right-[-6rem] h-80 w-80 rounded-full bg-gradient-to-br from-indoss-aqua/60 to-indoss-orange/70 blur-[140px]" />

      <section className="section pt-10 pb-16 lg:pt-14 lg:pb-20 space-y-12">
        {/* intro */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] items-start">
          <div className="space-y-5">
            <p className="text-[11px] tracking-[0.3em] uppercase text-indoss-charcoal/60">
              About Indoss
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold text-indoss-charcoal">
              A renewable-energy company rooted in Assam.
            </h1>
            <p className="text-sm sm:text-base text-indoss-charcoal/80">
              Indoss Energy LLP is built around a simple idea: the North-East
              deserves clean energy solutions that are designed for its rivers,
              hills, floods and local institutions—not copy-pasted from other
              regions.
            </p>
            <p className="text-sm sm:text-base text-indoss-charcoal/80">
              We bring together on-ground solar EPC, microgrid implementation
              and research-driven advisory for utilities, urban bodies and
              mission-driven organisations. Our work is deeply local, but the
              engineering and analytics match global benchmarks.
            </p>
          </div>

          {/* image collage */}
          <div className="space-y-4">
            <div className="gradient-border rounded-3xl p-[2px]">
              <div className="glass-card rounded-3xl overflow-hidden hover-glow">
                <img
                  src="https://images.unsplash.com/photo-1584270354949-c26b0cfd0974?auto=format&fit=crop&w=900&q=80"
                  alt="Solar panels in hilly terrain"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 text-[12px] text-indoss-charcoal/80">
                  Systems designed for real rooftops and village layouts in
                  Assam and the North-East, not just idealised CAD drawings.
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-[11px] text-indoss-charcoal/70">
              <div className="flex-1 rounded-2xl bg-white border border-white/80 p-3 hover-glow">
                <p className="font-semibold text-[12px]">Based in Assam</p>
                <p>Deep familiarity with local grid realities, monsoon and terrain.</p>
              </div>
              <div className="flex-1 rounded-2xl bg-white border border-white/80 p-3 hover-glow">
                <p className="font-semibold text-[12px]">Built for partnership</p>
                <p>Designed to work with DISCOMs, institutions and communities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* vision & mission cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-3xl p-6 hover-glow">
            <h2 className="text-xl font-semibold mb-2">Vision</h2>
            <p className="text-sm text-indoss-charcoal/85">
              A North-East where every household, institution and enterprise can
              rely on clean, resilient and affordable energy—enabling growth
              while preserving rivers, forests and communities.
            </p>
          </div>
          <div className="glass-card rounded-3xl p-6 hover-glow">
            <h2 className="text-xl font-semibold mb-2">Mission</h2>
            <ul className="text-sm text-indoss-charcoal/85 space-y-1.5">
              <li>• Deliver honest, high-quality solar and microgrid projects.</li>
              <li>• Support government schemes with strong field execution.</li>
              <li>• Provide research-backed advisory to utilities and agencies.</li>
              <li>• Build local capacity and green livelihoods in Assam.</li>
            </ul>
          </div>
        </div>

        {/* timeline */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr] items-start">
          <div>
            <h2 className="text-lg font-semibold mb-3">Our roadmap</h2>
            <p className="text-sm text-indoss-charcoal/80 mb-4">
              Indoss is intentionally staged. We start with solar EPC, but the
              company is structured as a platform that can grow into microgrids,
              EV-ready infrastructure and analytics tools over the next decade.
            </p>
            <div className="space-y-4">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="flex gap-4 items-start rounded-3xl bg-white border border-white/80 p-4 hover-glow"
                >
                  <div className="mt-1 rounded-full bg-indoss-teal text-white text-[11px] px-3 py-1">
                    {m.year}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-indoss-charcoal">
                      {m.title}
                    </p>
                    <p className="text-sm text-indoss-charcoal/80">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* how we work */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">How we work</h2>
            <div className="grid gap-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-3xl bg-white border border-white/80 p-4 hover-glow flex gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indoss-mist text-lg">
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-indoss-charcoal">
                      {p.title}
                    </p>
                    <p className="text-[13px] text-indoss-charcoal/80">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
