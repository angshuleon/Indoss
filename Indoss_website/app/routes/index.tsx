export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* background blobs */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br from-indoss-orange/60 to-indoss-aqua/60 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-indoss-teal/60 to-indigo-900/60 blur-[150px]" />

      {/* HERO */}
      <section className="section pt-12 pb-16 lg:pt-20 lg:pb-24 relative">
        <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-center">
          {/* left */}
          <div className="space-y-7 animate-fade-up">
            <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-indoss-charcoal/70 shadow-soft border border-white/80">
              Renewable energy from Assam · Solar · Microgrids · EV-ready
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-indoss-charcoal">
              Building the <span className="text-gradient">next signal</span> in
              renewable energy.
            </h1>

            <p className="text-sm sm:text-base text-indoss-charcoal/80 max-w-xl">
              Indoss Energy LLP is a renewable energy company rooted in Assam,
              helping households, institutions and businesses adopt solar,
              microgrids and modern energy systems that are reliable, transparent
              and future-ready.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-indoss-orange px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-glow"
              >
                Get a solar proposal
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-indoss-charcoal/15 bg-white/80 px-6 py-2.5 text-sm font-medium text-indoss-charcoal hover:border-indoss-orange hover:text-indoss-orange"
              >
                Explore our services
              </a>
            </div>

            <div className="grid max-w-lg grid-cols-3 gap-3 text-[11px] text-indoss-charcoal/80">
              <div className="rounded-2xl bg-white/85 border border-white/90 p-3 hover-glow">
                <p className="font-semibold text-[12px] text-indoss-charcoal">
                  Where we work
                </p>
                <p>Assam & North-East India</p>
              </div>
              <div className="rounded-2xl bg-white/85 border border-white/90 p-3 hover-glow">
                <p className="font-semibold text-[12px] text-indoss-charcoal">
                  What we do
                </p>
                <p>Solar EPC · Microgrids · Advisory</p>
              </div>
              <div className="rounded-2xl bg-white/85 border border-white/90 p-3 hover-glow">
                <p className="font-semibold text-[12px] text-indoss-charcoal">
                  How we work
                </p>
                <p>Honest sizing · Smart design · Local support</p>
              </div>
            </div>
          </div>

          {/* right – image / schematic card */}
          <div className="relative animate-fade-up lg:delay-150">
            <div className="gradient-border rounded-3xl p-[2px]">
              <div className="glass-card rounded-3xl p-4 sm:p-6 hover-glow">
                <div className="overflow-hidden rounded-2xl mb-4">
                  {/* replace src with your own schematic/field photo later */}
                  <img
                    src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80"
                    alt="Solar plant schematic"
                    className="h-48 w-full object-cover"
                  />
                </div>
                <h2 className="font-semibold text-indoss-charcoal mb-1 text-sm">
                  Solar, microgrids & EV-ready infrastructure
                </h2>
                <p className="text-[13px] text-indoss-charcoal/85 mb-3">
                  Systems designed for Assam’s topography, grid conditions and
                  climate realities—balancing resilience, cost and ease of
                  operation.
                </p>
                <div className="grid grid-cols-3 gap-3 text-[11px] text-indoss-charcoal/80">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-indoss-charcoal/60">
                      Rooftop
                    </p>
                    <p>Homes, schools, campuses</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-indoss-charcoal/60">
                      Microgrids
                    </p>
                    <p>Remote & flood-prone areas</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-indoss-charcoal/60">
                      Advisory
                    </p>
                    <p>Utilities & institutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENTS / VALUE PROPS */}
      <section className="section pb-16 grid gap-6 md:grid-cols-3">
        <div className="hover-glow rounded-3xl bg-white border border-white/80 p-6 animate-fade-up">
          <p className="text-[11px] uppercase tracking-[0.3em] text-indoss-charcoal/60 mb-2">
            About
          </p>
          <h3 className="font-semibold text-lg mb-2">Rooted in Assam</h3>
          <p className="text-sm text-indoss-charcoal/80 mb-3">
            A local team focused on long-term partnerships, strong execution
            and honest communication.
          </p>
          <a
            href="/about"
            className="text-sm font-semibold text-indoss-orange hover:underline"
          >
            Learn more →
          </a>
        </div>

        <div className="hover-glow rounded-3xl bg-white border border-white/80 p-6 animate-fade-up">
          <p className="text-[11px] uppercase tracking-[0.3em] text-indoss-charcoal/60 mb-2">
            Services
          </p>
          <h3 className="font-semibold text-lg mb-2">Solar EPC first</h3>
          <p className="text-sm text-indoss-charcoal/80 mb-3">
            We start with high-quality solar EPC and gradually expand towards
            microgrids, EV-charging and flexibility.
          </p>
          <a
            href="/services"
            className="text-sm font-semibold text-indoss-orange hover:underline"
          >
            View services →
          </a>
        </div>

        <div className="hover-glow rounded-3xl bg-white border border-white/80 p-6 animate-fade-up">
          <p className="text-[11px] uppercase tracking-[0.3em] text-indoss-charcoal/60 mb-2">
            Verticals
          </p>
          <h3 className="font-semibold text-lg mb-2">Platform for the future</h3>
          <p className="text-sm text-indoss-charcoal/80 mb-3">
            Microgrids, climate action, scheme implementation and research &
            policy support for the North-East.
          </p>
          <a
            href="/verticals"
            className="text-sm font-semibold text-indoss-orange hover:underline"
          >
            Explore verticals →
          </a>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="section pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indoss-teal via-indigo-900 to-indoss-orange text-white px-6 py-8 md:px-10 md:py-9 hover-glow">
          <div className="absolute inset-y-0 right-0 w-1/3 opacity-30 bg-[radial-gradient(circle_at_top,_#F6F7F7_0,_transparent_60%)]" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-2">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
                Start a conversation
              </p>
              <h2 className="font-semibold text-lg md:text-xl">
                Planning a solar plant or microgrid in Assam or the North-East?
              </h2>
              <p className="text-sm text-white/85">
                Share your site, load and timelines—we’ll respond with an
                initial assessment and a clear next step, without over-selling.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-indoss-teal shadow-soft hover:shadow-glow"
            >
              Talk to Indoss →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
