// app/routes/tool.tsx

const TOOL_URL = "http://localhost:5174"; 
// later: change to "https://tool.indoss.in" or similar

export default function ToolPage() {
  return (
    <div className="section py-10 lg:py-14 space-y-6">
      <div className="max-w-3xl space-y-3">
        <p className="text-[11px] tracking-[0.3em] uppercase text-indoss-charcoal/60">
          Indoss Tools
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-indoss-charcoal">
          Indoss Energy planning tool
        </h1>
        <p className="text-sm sm:text-base text-indoss-charcoal/80">
          This interactive tool helps you explore solar plant sizing, energy
          production and simple financial indicators for your site. It runs as a
          separate application and is embedded here for easy access during
          development.
        </p>
        <p className="text-[11px] text-indoss-charcoal/60">
          For now the tool is loaded from <code>localhost</code>. Once deployed,
          we’ll replace this with the production URL.
        </p>
      </div>

      <div className="gradient-border rounded-3xl p-[2px]">
        <div className="glass-card rounded-3xl overflow-hidden">
          <iframe
            src={TOOL_URL}
            title="Indoss Energy Tool"
            className="w-full h-[70vh] min-h-[480px] border-0"
          />
        </div>
      </div>
    </div>
  );
}
