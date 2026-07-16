import { Check, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    subtitle: "Mulai Online Cepat",
    desc: "Cocok untuk personal brand / usaha kecil yang baru mulai",
    price: "Rp 850.000",
    features: [
      "1 Halaman (Landing Page)",
      "Template modern & clean",
      "Mobile responsive",
      "WhatsApp button langsung chat",
      "Integrasi Google Maps",
      "Domain (.com/.id) 1 tahun",
      "Basic speed optimization",
      "1x revisi",
      "Estimasi pengerjaan: 3-5 hari"
    ],
    focus: "cepat online, simple, langsung jalan",
    cta: "Pilih Starter",
    popular: false,
  },
  {
    name: "Growth",
    subtitle: "Naikin Penjualan",
    desc: "Cocok untuk bisnis yang sudah jalan & mau lebih serius",
    price: "Rp 1.850.000",
    features: [
      "3–5 halaman (Home, About, Service)",
      "Semi custom design (branding terasa)",
      "Layout fokus conversion",
      "WhatsApp + form lead",
      "Basic SEO (mulai muncul di Google)",
      "Domain (.com/.id) 1 tahun",
      "Integrasi Google Maps",
      "Kecepatan website optimal",
      "2x revisi",
      "Support 2 minggu",
      "Estimasi pengerjaan: 1-2 minggu"
    ],
    focus: "mulai generate leads & terlihat profesional",
    cta: "Pilih Growth",
    popular: true,
  },
  {
    name: "Pro",
    subtitle: "Brand Naik Level",
    desc: "Cocok untuk bisnis serius / perusahaan / brand premium",
    price: "Rp 3.500.000",
    features: [
      "5–10 halaman",
      "Full custom design (bukan template)",
      "UI/UX premium (feel brand besar)",
      "Advanced layout (storytelling + CTA)",
      "SEO basic + struktur siap scale",
      "Domain (.com/.id) 1 tahun",
      "WhatsApp + form + sistem lead",
      "Integrasi tracking (Analytics)",
      "Speed optimization advanced",
      "3x revisi",
      "Support 1 bulan",
      "Estimasi pengerjaan: 2-4 minggu"
    ],
    focus: "branding kuat + sistem marketing jalan",
    cta: "Pilih Pro",
    popular: false,
  },
];

export const Pricing = () => (
  <section
    id="pricing"
    className="section"
    style={{
      background: `hsl(var(--surface-light))`,
      color: `hsl(var(--surface-light-foreground))`,
    }}
  >
    <div className="container-tight">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Rocket className="h-10 w-10 text-primary animate-float" />
          </div>
        </div>
        <p className="eyebrow">Paket Website</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Paket Harga Jasa Pembuatan Website Profesional
        </h2>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Lebih murah dari 1 bulan gaji admin —{" "}
          <span className="text-primary font-semibold">tapi bekerja</span> 24 jam.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-primary/60">
          <span>Starter</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Growth</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Pro</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-[2.5rem] bg-white p-8 sm:p-10 flex flex-col transition-all duration-300 ${
              p.popular ? "border-[3px] border-primary shadow-blue-glow scale-105 z-10" : "border border-gray-100"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white">
                Most Popular
              </span>
            )}
            
            <div className="text-center pb-8 border-b border-gray-50">
              <h3 className="font-display font-bold text-3xl">{p.name}</h3>
              <p className="text-[10px] sm:text-xs font-bold text-primary mt-2 uppercase tracking-widest">{p.subtitle}</p>
              <p className="mt-6 font-display text-3xl sm:text-4xl font-bold">{p.price}</p>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-4 leading-relaxed px-4">{p.desc}</p>
            </div>
            
            <ul className="mt-8 space-y-4 text-[11px] sm:text-xs lg:text-sm flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" strokeWidth={3} />
                  <span className="text-gray-600 leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-6 border-t border-gray-50 text-[10px] sm:text-[11px] font-medium text-gray-500 flex items-center justify-center gap-3 bg-gray-50/50 -mx-8 sm:-mx-10 px-8 sm:px-10 py-5">
              <Rocket className="h-4 w-4 text-primary/60" />
              <span className="leading-tight text-left">Fokus: {p.focus}</span>
            </div>

            <a
              href={`https://wa.me/6285122953096?text=${encodeURIComponent(`Halo Zayrion Tech, saya tertarik dengan paket ${p.name} (${p.price}). Bisa diskusi lebih lanjut?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 block text-center w-full rounded-xl py-4 text-sm font-bold transition-all duration-300 ${
                p.popular
                  ? "bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/25"
                  : "bg-white border border-gray-200 text-gray-800 hover:border-primary hover:text-primary"
              }`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);