export default function ContactPage() {
  return (
    <div className="section py-12 lg:py-16 space-y-8">
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-indoss-charcoal/60">
          Contact
        </p>
        <h1 className="font-serif text-3xl text-indoss-charcoal">
          Let’s plan your next energy project
        </h1>
        <p className="text-sm sm:text-base text-indoss-charcoal/80">
          Share a few details about your site, load and timeline. We’ll respond
          with an initial assessment and outline how Indoss can support you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-8 hover-glow">
        <form className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indoss-charcoal/70 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-indoss-charcoal/15 px-3 py-2 text-sm bg-indoss-mist focus:outline-none focus:ring-2 focus:ring-indoss-orange/70"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-indoss-charcoal/70 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-indoss-charcoal/15 px-3 py-2 text-sm bg-indoss-mist focus:outline-none focus:ring-2 focus:ring-indoss-orange/70"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indoss-charcoal/70 mb-1">
                Organisation / site type
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-indoss-charcoal/15 px-3 py-2 text-sm bg-indoss-mist focus:outline-none focus:ring-2 focus:ring-indoss-orange/70"
                placeholder="Household, school, tea estate, factory..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-indoss-charcoal/70 mb-1">
                Approx. connected load / kW
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-indoss-charcoal/15 px-3 py-2 text-sm bg-indoss-mist focus:outline-none focus:ring-2 focus:ring-indoss-orange/70"
                placeholder="e.g., 50 kW, 500 kW"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indoss-charcoal/70 mb-1">
              Brief description
            </label>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-indoss-charcoal/15 px-3 py-2 text-sm bg-indoss-mist focus:outline-none focus:ring-2 focus:ring-indoss-orange/70"
              placeholder="Location, roof type, current challenges, preferred timeline..."
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-indoss-orange text-white text-sm font-semibold shadow-soft hover:shadow-glow"
            >
              Submit enquiry
            </button>
            <p className="text-[11px] text-indoss-charcoal/60">
              Form handling can later be wired to an API, email service or CRM.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
