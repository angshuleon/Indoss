export default function ProjectsPage() {
  return (
    <div className="section py-12 lg:py-16 space-y-8">
      <div className="max-w-3xl space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-indoss-charcoal/60">
          Projects
        </p>
        <h1 className="font-serif text-3xl text-indoss-charcoal">
          Pilot projects & early work
        </h1>
        <p className="text-sm sm:text-base text-indoss-charcoal/80">
          As we grow, this space will showcase rooftop systems, microgrids and
          advisory assignments across Assam and neighbouring states. For now,
          these cards act as placeholders for upcoming case studies.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-white/80 p-6 hover-glow"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-indoss-charcoal/60 mb-1">
              Coming soon
            </p>
            <h2 className="font-serif text-lg text-indoss-charcoal mb-2">
              Project placeholder #{i}
            </h2>
            <p className="text-sm text-indoss-charcoal/80 mb-3">
              Replace this with a real rooftop or microgrid project with simple
              metrics, photos and learnings.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-indoss-charcoal/70">
              <span className="px-2.5 py-1 rounded-full bg-indoss-aqua/20">
                Solar EPC
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indoss-orange/15">
                Assam
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
