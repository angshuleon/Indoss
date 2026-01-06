// app/routes/cleaning.tsx
export default function CleaningPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-indoss-orange/60 to-indoss-aqua/60 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-indoss-teal/60 to-indigo-900/60 blur-[150px]" />

      <section className="section pt-10 pb-16 lg:pt-14 lg:pb-20 space-y-10 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-[11px] tracking-[0.3em] uppercase text-indoss-charcoal/60">
            Solar Panel Cleaning
          </p>
          <h1 className="text-3xl lg:text-5xl font-semibold text-indoss-charcoal">
            Renew Your Solar's Efficiency
          </h1>
          <p className="text-base lg:text-lg text-indoss-charcoal/80">
            Professional rooftop solar system cleaning for Guwahati
          </p>
        </div>

        {/* Base Rate Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indoss-teal via-indigo-900 to-indoss-teal text-white p-8 lg:p-10 hover-glow">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Base Rate */}
            <div className="space-y-3">
              <h2 className="text-2xl lg:text-3xl font-semibold">
                Base Rate: ₹250 / kW
              </h2>
              <p className="text-sm text-white/90 leading-relaxed">
                Dust, pollen, and bird droppings can reduce solar output by up to 20%.
                Our trained team ensures your panels perform at their peak through Assam's
                humid cycles.
              </p>
            </div>

            {/* Right: Why Choose Indoss */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-indoss-aqua">
                Why Choose Indoss?
              </h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start">
                  <span className="text-indoss-aqua mr-2">✓</span>
                  Non-abrasive cleaning methods
                </li>
                <li className="flex items-start">
                  <span className="text-indoss-aqua mr-2">✓</span>
                  Monsoon grime & bird drop removal
                </li>
                <li className="flex items-start">
                  <span className="text-indoss-aqua mr-2">✓</span>
                  Trained professionals (Safety First)
                </li>
                <li className="flex items-start">
                  <span className="text-indoss-aqua mr-2">✓</span>
                  Extended lifespan for your panels
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Maintenance Packages */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-indoss-charcoal text-center">
            Maintenance Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* One-Time Deep Clean */}
            <div className="rounded-3xl bg-white border border-white/80 p-6 hover-glow space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-indoss-charcoal">
                  One-Time Deep Clean
                </h3>
                <p className="text-3xl font-bold text-indoss-orange mt-2">
                  ₹250 <span className="text-base font-normal text-indoss-charcoal/60">/kW</span>
                </p>
              </div>
              <p className="text-sm text-indoss-charcoal/80">
                Ideal for seasonal checkups or post-construction dust.
              </p>
            </div>

            {/* 6-Month Subscription */}
            <div className="rounded-3xl bg-white border border-white/80 p-6 hover-glow space-y-4 relative">
              <div className="absolute top-4 right-4 bg-indoss-orange text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Save 12%
              </div>
              <div>
                <h3 className="font-semibold text-lg text-indoss-charcoal">
                  6-Month Subscription
                </h3>
                <p className="text-3xl font-bold text-indoss-orange mt-2">
                  ₹1320 <span className="text-base font-normal text-indoss-charcoal/60">/kW</span>
                </p>
              </div>
              <div className="text-sm text-indoss-charcoal/80 space-y-1">
                <p className="font-semibold">6 Cleanings (1/month)</p>
                <p>i.e. ₹220/kW/month</p>
                <p className="text-xs text-indoss-charcoal/70 mt-2">
                  Consistent performance through half the year.
                </p>
              </div>
            </div>

            {/* Annual Protection */}
            <div className="rounded-3xl bg-gradient-to-br from-indoss-orange/10 to-indoss-aqua/10 border-2 border-indoss-orange p-6 hover-glow space-y-4 relative">
              <div className="absolute top-4 right-4 bg-indoss-orange text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Best Value · Save 20%
              </div>
              <div>
                <h3 className="font-semibold text-lg text-indoss-charcoal">
                  Annual Protection
                </h3>
                <p className="text-3xl font-bold text-indoss-orange mt-2">
                  ₹2400 <span className="text-base font-normal text-indoss-charcoal/60">/kW</span>
                </p>
              </div>
              <div className="text-sm text-indoss-charcoal/80 space-y-1">
                <p className="font-semibold">12 Cleanings (1/month)</p>
                <p>i.e. ₹200/kW/month</p>
                <p className="text-xs text-indoss-charcoal/70 mt-2">
                  The ultimate peace of mind for your investment.
                </p>
              </div>
            </div>
          </div>

          {/* Features Strip */}
          <div className="rounded-2xl bg-indoss-mist/50 border border-indoss-charcoal/10 p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-indoss-charcoal/80">
              <div className="flex items-center justify-center gap-2">
                <span className="text-indoss-orange">●</span>
                Pressure-Regulated Water
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-indoss-orange">●</span>
                Soft Bristle Tech
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-indoss-orange">●</span>
                Full Safety Gear
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-indoss-orange">●</span>
                Performance Report
              </div>
            </div>
          </div>
        </div>

        {/* Book a Cleaning CTA */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indoss-teal via-indigo-900 to-indoss-orange text-white p-8 lg:p-10 hover-glow">
          <div className="grid lg:grid-cols-[1fr,auto] gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-2xl lg:text-3xl font-semibold">
                Book a Cleaning
              </h2>
              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-indoss-aqua">📞</span>
                  <a href="tel:+91XXXXXXXXXX" className="hover:underline">
                    +91 XXXXX XXXXX
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-indoss-aqua">✉</span>
                  <a href="mailto:support@indoss.in" className="hover:underline">
                    support@indoss.in
                  </a>
                </p>
                <p className="text-white/80 mt-2">
                  Serving Guwahati, North Guwahati & Dispur Area
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-indoss-orange shadow-soft hover:shadow-glow transition-all hover:scale-105"
              >
                Contact Us to Book →
              </a>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-white/60 border border-white/80 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-indoss-charcoal uppercase tracking-wide">
            Terms & Conditions
          </h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-[11px] text-indoss-charcoal/70 leading-relaxed">
            <ul className="space-y-1 list-disc list-inside">
              <li>Minimum booking is total system capacity.</li>
              <li>Subscription covers 1 scheduled cleaning per month.</li>
              <li>Emergency calls may not be valid for add-cost access.</li>
              <li>Travel fees may apply for locations 30km+ from Guwahati.</li>
            </ul>
            <ul className="space-y-1 list-disc list-inside">
              <li>Excludes removal of cement, paint, or heavy industrial residue.</li>
              <li>24-hour notice required for rescheduling appointments.</li>
              <li>Annual/6-month plans are payable in advance.</li>
              <li>Service subject to safe weather conditions (not heavy rain).</li>
            </ul>
          </div>
        </div>

        {/* Footer branding
        <div className="text-center text-xs text-indoss-charcoal/60">
          <p>INDOSS ENERGY LLP · www.indoss.in</p>
        </div> */}
      </section>
    </div>
  );
}
