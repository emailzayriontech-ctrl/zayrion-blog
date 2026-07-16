const steps = [
  { n: "01", title: "Discovery", desc: "Pahami bisnis & target." },
  { n: "02", title: "Design", desc: "Susun visual & flow." },
  { n: "03", title: "Build", desc: "Develop dengan rapi." },
  { n: "04", title: "Launch", desc: "Online & siap closing." },
];

export const Process = () => (
  <section id="process" className="section">
    <div className="container-tight">
      <div className="max-w-2xl reveal">
        <p className="eyebrow">Process</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
          4 langkah, tanpa drama
        </h2>
      </div>

      <div className="mt-20 relative">
        <div className="absolute top-5 left-0 right-0 h-px bg-border hidden md:block" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="h-10 w-10 rounded-full bg-background border border-primary/60 flex items-center justify-center text-primary text-xs font-semibold">
                {s.n}
              </div>
              <h3 className="mt-5 font-display font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);