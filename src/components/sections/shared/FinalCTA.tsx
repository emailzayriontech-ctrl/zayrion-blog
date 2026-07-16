import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export const FinalCTA = () => (
  <section id="contact" className="relative py-24 md:py-32 bg-background overflow-hidden border-t border-white/5">
    {/* Abstract Background Glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
    
    <div className="container-tight relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Text & Contact Info */}
        <div className="reveal">
          <span className="text-primary font-semibold tracking-widest text-sm uppercase mb-4 block">
            KONSULTASI GRATIS
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-foreground">
            Siap mendominasi <span className="text-primary">pasar online?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light mb-10 leading-relaxed">
            Mari diskusikan bagaimana kami bisa membantu bisnis Anda tumbuh lebih cepat melalui website dan sistem digital yang tepat sasaran.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="font-semibold text-foreground">+62 851-2295-3096</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">hello@zayriontech.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lokasi</p>
                <p className="font-semibold text-foreground">Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Offer Card */}
        <div className="reveal rounded-3xl bg-white/5 border border-white/10 p-8 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none"></div>
          
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-white">
            Dapatkan Preview Redesign Homepage <span className="text-primary">Gratis</span>
          </h3>
          
          <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
            Kami akan mendesain ulang 1 bagian homepage website Anda secara gratis. Lihat sendiri perbedaan kualitasnya sebelum memutuskan.
          </p>
          
          <a
            href="https://wa.me/6285122953096"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-blue-glow hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95"
          >
            Klaim Preview Gratis
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-center text-xs text-muted-foreground mt-6">
            Balasan cepat via WhatsApp. Tanpa komitmen.
          </p>
        </div>

      </div>
    </div>
  </section>
);