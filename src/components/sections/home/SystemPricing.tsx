import { Check } from "lucide-react";

const tiers = [
  {
    name: "Basic System",
    price: "Mulai Rp 5 Jt",
    desc: "Sistem sederhana untuk automasi operasional dasar.",
    features: ["Database terpusat", "Dashboard admin", "Manajemen data dasar", "Export laporan (Excel/CSV)", "Estimasi pengerjaan: 4-6 minggu"],
    cta: "Konsultasi Basic",
    popular: false,
  },
  {
    name: "Booking System",
    price: "Mulai Rp 10 Jt",
    desc: "Sistem reservasi / appointment otomatis untuk bisnis Anda.",
    features: ["Manajemen jadwal real-time", "Notifikasi WhatsApp/Email", "Integrasi Payment Gateway", "Dashboard multi-user", "Estimasi pengerjaan: 4-8 minggu"],
    cta: "Konsultasi Booking",
    popular: true,
  },
  {
    name: "Custom Enterprise",
    price: "Mulai Rp 20 Jt+",
    desc: "Sistem kompleks dengan alur kerja (workflow) khusus.",
    features: ["Custom workflow & logic", "Multi-role management", "API pihak ketiga", "Arsitektur server scalable", "Estimasi pengerjaan: 2-4 bulan"],
    cta: "Diskusi Custom",
    popular: false,
  },
];

export const SystemPricing = () => (
  <section id="system-pricing" className="section bg-card/30">
    <div className="container-tight">
      <div className="max-w-2xl reveal mb-16 text-center mx-auto">
        <p className="eyebrow">System Pricing</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
          Investasi Jasa Pembuatan <span className="text-primary">Sistem Otomatis</span>
        </h2>
        <p className="mt-6 text-gray-400">
          Ubah proses manual menjadi otomatis. Kami membangun sistem yang menghemat ratusan jam kerja Anda setiap bulannya.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl bg-white/5 border p-6 sm:p-8 flex flex-col transition-all hover:bg-white/10 ${
              t.popular ? "border-primary shadow-blue-glow" : "border-white/10"
            }`}
          >
            {t.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-cta px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white shadow-blue-glow">
                Most Popular
              </span>
            )}
            
            <div className="text-center pb-6 border-b border-white/10">
              <h3 className="font-display font-bold text-2xl text-white">{t.name}</h3>
              <p className="mt-4 font-display text-2xl sm:text-3xl font-bold text-primary">{t.price}</p>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed px-2">{t.desc}</p>
            </div>
            
            <ul className="mt-6 space-y-3 text-[11px] sm:text-xs lg:text-sm flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-gray-300">
                  <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" strokeWidth={2.5} />
                  <span className="leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/6285122953096?text=${encodeURIComponent(`Halo Zayrion Tech, saya tertarik dengan sistem ${t.name} (${t.price}). Bisa diskusi lebih lanjut?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 block text-center w-full rounded-lg py-3 text-sm font-semibold transition ${
                t.popular
                  ? "bg-gradient-cta text-white hover:opacity-90 shadow-md"
                  : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              {t.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);