import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "Berapa lama proses pengerjaan?",
    answer: "Tergantung paket yang dipilih. Starter biasanya selesai dalam 3-5 hari, Growth memakan waktu 1-2 minggu, dan Pro sekitar 2-4 minggu. Untuk sistem kustom bisa lebih lama tergantung kompleksitas fitur."
  },
  {
    question: "Bagaimana sistem pembayaran (DP/pelunasan)?",
    answer: "Sistem pembayaran kami adalah 50% DP untuk memulai pengerjaan, dan sisa 50% pelunasan setelah website selesai dan siap untuk di-publish (live)."
  },
  {
    question: "Apa yang terjadi kalau revisi melebihi jatah?",
    answer: "Setiap paket memiliki batas revisi minor. Jika revisi melebihi jatah atau merupakan revisi mayor (perubahan desain total), akan dikenakan biaya tambahan yang disepakati bersama sebelum dikerjakan."
  },
  {
    question: "Siapa yang memegang source code & hosting setelah selesai?",
    answer: "Anda memegang kendali penuh. Kami akan memberikan akses penuh (credentials) untuk domain dan hosting. Source code juga sepenuhnya menjadi milik Anda setelah pelunasan."
  },
  {
    question: "Apakah ada garansi/maintenance setelah website live?",
    answer: "Ya, kami memberikan garansi bug dan support (14 hari untuk Growth, 30 hari untuk Pro) setelah website live. Jika butuh maintenance bulanan, kami juga menyediakan paket terpisah."
  },
  {
    question: "Bisa upgrade dari paket Starter ke Growth/Pro nanti?",
    answer: "Tentu saja! Anda bisa memulai dari Starter dan upgrade ke paket yang lebih tinggi kapan saja saat bisnis Anda berkembang. Biaya upgrade akan disesuaikan dengan fitur tambahan yang dibutuhkan."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <section className="section bg-background">
        <div className="container-tight max-w-3xl">
        <div className="text-center mb-12">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">
            FAQ Seputar Jasa Pembuatan Website
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ada pertanyaan sebelum mulai? Temukan jawabannya di bawah ini.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-border/50 rounded-xl bg-card/20 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-foreground text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-primary" : ""
                  }`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 md:p-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/10 mt-1">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};
