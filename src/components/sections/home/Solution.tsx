import { Rocket, Zap, MousePointerClick, TrendingUp } from "lucide-react";

const items = [
  { icon: Rocket, title: "Website Conversion-Focused", desc: "Website yang dirancang untuk menghasilkan leads, bukan sekadar tampil keren." },
  { icon: Zap, title: "High-Speed Performance", desc: "Loading cepat = lebih sedikit pengunjung kabur." },
  { icon: MousePointerClick, title: "UI/UX yang Jelas & Efektif", desc: "User langsung paham harus klik apa, tanpa bingung." },
  { icon: TrendingUp, title: "Landing Page untuk Campaign", desc: "Cocok untuk iklan & promo biar lebih banyak closing." },
];

export const Solution = () => (
  <section
    className="section"
    style={{
      background: `hsl(var(--surface-light))`,
      color: `hsl(var(--surface-light-foreground))`,
    }}
  >
    <div className="container-tight">
      <div className="text-center max-w-2xl mx-auto reveal">
        <p className="eyebrow">SERVICES</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
          Layanan Jasa Pembuatan Website & Sistem Custom
        </h2>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-8 border"
            style={{ borderColor: `hsl(var(--surface-light-border))` }}
          >
            <Icon className="h-7 w-7 text-primary" strokeWidth={2.2} />
            <h3 className="mt-6 font-display font-semibold text-lg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: `hsl(var(--surface-light-muted))` }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);