import proofWebsite from "@/assets/proof-website.jpg";
import proofDashboard from "@/assets/proof-dashboard.jpg";
import proofWhatsapp from "@/assets/proof-whatsapp.jpg";

const shots = [
  { src: proofWebsite, label: "Website Profesional" },
  { src: proofDashboard, label: "Dashboard Sistem" },
  { src: proofWhatsapp, label: "Inquiry via WhatsApp" },
];

export const Proof = () => (
  <section id="proof" className="section">
    <div className="container-tight grid lg:grid-cols-[0.9fr_1.6fr] gap-16 items-center">
      <div className="reveal">
        <p className="eyebrow">Bukti Nyata</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
          Dari sepi menjadi ramai <span className="text-primary">inquiry</span>
        </h2>
        <p className="mt-6 text-muted-foreground max-w-sm leading-relaxed">
          Website + sistem yang tepat bisa mengubah bisnis Anda.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex rounded-full border border-border px-5 py-2.5 text-sm hover:bg-secondary transition"
        >
          Lihat Case Study
        </a>
      </div>
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {shots.map((s) => (
          <figure key={s.label} className="space-y-3">
            <div className="aspect-[3/4] overflow-hidden rounded-xl border border-border bg-card">
              <img
                src={typeof s.src === 'string' ? s.src : (s.src as any).src}
                alt={s.label}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-center text-xs md:text-sm text-muted-foreground">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);