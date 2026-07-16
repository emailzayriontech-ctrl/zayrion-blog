import { Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

const testimonials = [
  {
    quote: "Sejak pakai Zayrion, inquiry WhatsApp naik 4x. Website-nya bukan cuma cantik — tapi benar-benar menjual.",
    name: "Andre",
    role: "Founder, Kopinaka Coffee",
  },
  {
    quote: "Awalnya ragu bikin web, tapi setelah dibantu Zayrion, closing rate kami naik 2x lipat dalam sebulan pertama.",
    name: "Budi",
    role: "Owner, IronFit Gym",
  },
  {
    quote: "Desainnya premium banget, sesuai dengan brand image villa kami. Booking langsung via WhatsApp jauh lebih rapi.",
    name: "Citra",
    role: "Manager, VillaKita",
  },
  {
    quote: "Prosesnya cepat dan komunikasinya jelas. Sistem reservasi yang dibuat sangat membantu operasional harian kami.",
    name: "Diana",
    role: "Owner, Beeyo Skincare",
  }
];

export const Testimonial = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zayriontech.com/#localbusiness",
    "name": "Zayrion Tech",
    "review": testimonials.map(t => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewBody": t.quote
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <section className="section bg-card/20">
        <div className="container-tight">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold">Apa Kata Mereka?</h2>
        <p className="text-muted-foreground mt-4">Bukti nyata dari bisnis yang sudah bertransformasi bersama kami.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, idx) => (
          <div key={idx} className="rounded-2xl border border-border bg-card/40 p-8 text-center flex flex-col justify-between">
            <div>
              <div className="flex justify-center text-primary mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl font-medium leading-snug">
                “{t.quote}”
              </blockquote>
            </div>
            <p className="mt-6 text-sm text-muted-foreground font-semibold">
              {t.name} — {t.role}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
    </>
  );
};