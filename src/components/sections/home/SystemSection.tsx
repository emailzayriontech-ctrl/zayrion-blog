import { Calendar, Users, BarChart3, Wrench } from "lucide-react";

const items = [
  { icon: Calendar, title: "Booking System", desc: "Jadwal & reservasi otomatis." },
  { icon: Users, title: "CRM", desc: "Kelola customer dalam satu tempat." },
  { icon: BarChart3, title: "Dashboard", desc: "Data real-time, keputusan cepat." },
  { icon: Wrench, title: "Internal Tools", desc: "Otomatisasi operasional bisnis." },
];

export const SystemSection = () => (
  <section id="system" className="section">
    <div className="container-tight">
      <div className="max-w-2xl reveal">
        <p className="eyebrow">Sistem</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
          Saat bisnis siap <span className="text-primary">scale</span>
        </h2>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border p-7 bg-card/40 hover:border-primary/50 hover:bg-card transition-colors"
          >
            <Icon className="h-6 w-6 text-primary" strokeWidth={2.2} />
            <h3 className="mt-5 font-display font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);