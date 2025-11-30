const verticals = [
  {
    title: "Microgrid & Decentralised Energy Systems",
    description:
      "Solar microgrids and hybrid systems for communities and institutions in remote or underserved parts of Assam and the North-East.",
    tags: ["Solar DC microgrids", "AC mini-grids", "Hybrid systems", "Monitoring"],
  },
  {
    title: "Energy Sustainability & Climate Action",
    description:
      "Climate-aware planning, efficient infrastructure and clean-cooking solutions aligned with local realities and climate risks.",
    tags: ["GP energy plans", "Efficient buildings", "Clean cooking", "Awareness"],
  },
  {
    title: "Implementation Support for Schemes",
    description:
      "Last-mile support for national and state-level schemes on solar, clean cooking and e-mobility—bridging policy and ground realities.",
    tags: ["PM Surya Ghar", "State solar schemes", "EV charging", "Monitoring"],
  },
  {
    title: "Research, Policy & Consultancy",
    description:
      "Data-driven analysis and tools to support DISCOMs, regulators and governments on integrating EVs and distributed renewables.",
    tags: ["Demand modelling", "EV-grid studies", "Tariff design", "Capacity-building"],
  },
];

export default function VerticalsPage() {
  return (
    <div className="bg-indoss-teal text-white">
      <div className="section py-12 lg:py-16 space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
            Verticals & Focus Areas
          </p>
          <h1 className="font-serif text-3xl">Platform for the coming decade</h1>
          <p className="text-sm sm:text-base text-white/80">
            Indoss is structured as a platform that blends on-ground
            implementation with technical and policy expertise. Solar EPC is
            our starting point, but our roadmap extends to microgrids, climate
            action and EV-ready systems across the North-East.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {verticals.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl bg-white/5 border border-white/20 p-6 hover-glow"
            >
              <h2 className="font-serif text-lg mb-2">{v.title}</h2>
              <p className="text-sm text-white/80 mb-3">{v.description}</p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-indoss-aqua/25 border border-indoss-aqua/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
