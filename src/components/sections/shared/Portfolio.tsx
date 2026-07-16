import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const projects = [
  {
    title: "Hotel Management System / Property Management System (PMS)",
    category: "Integrated Hospitality Management",
    image: "https://res.cloudinary.com/dweal4q39/image/upload/v1778140237/04.05.2026_16.34.41_REC_d2rosv.png",
    desc: "Sistem operasional hotel modern untuk mengelola reservasi dan room status.",
    gallery: [
      "https://res.cloudinary.com/dweal4q39/image/upload/v1778140237/04.05.2026_16.34.41_REC_d2rosv.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400034/07.07.2026_10.16.15_REC_qvwhkw.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400597/07.07.2026_10.01.46_REC_tbo7xi.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783399993/07.07.2026_09.57.07_REC_bkebxd.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400023/07.07.2026_10.00.03_REC_q0ciip.png"
      
    ]
  },
  {
    title: "Booking Management System / Reservation Dashboard",
    category: "SaaS & Operational Tools",
    image: "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400062/07.07.2026_09.52.44_REC_u50rya.png",
    desc: "Sistem reservasi digital realtime untuk mengatur jadwal booking dan venue.",
    gallery: [
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400062/07.07.2026_09.52.44_REC_u50rya.png",
      "",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400054/07.07.2026_09.52.17_REC_b5isjp.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400042/07.07.2026_09.49.51_REC_ez2p07.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400048/07.07.2026_09.50.17_REC_p0mhef.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400055/07.07.2026_09.51.32_REC_dtq7ad.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400042/07.07.2026_09.51.13_REC_spdyg9.png"
    ]
  },
  {
    title: "Simple Landing Page / Company Profile Website",
    category: "Your Brand Profile",
    image: "https://res.cloudinary.com/ja16ouoe/image/upload/v1783404730/07.07.2026_13.03.18_REC_tewnuc.png",
    desc: "Website modern untuk branding, promosi, dan meningkatkan reservasi bisnis anda.",
    gallery: [
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783404730/07.07.2026_13.03.18_REC_tewnuc.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783404689/07.07.2026_13.03.43_REC_nwzron.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783404698/07.07.2026_13.04.00_REC_pun88b.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783404659/07.07.2026_13.04.43_REC_cr2acn.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783404716/07.07.2026_13.04.18_REC_m0w6jq.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783404660/07.07.2026_13.04.59_REC_ozim4r.png"
    ]
  },
  {
    title: "Custom APK/WEB",
    category: "Your Brand Profile",
    image: "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400034/07.07.2026_10.48.10_REC_psznaw.png",
    desc: "Website modern untuk branding, promosi, dan meningkatkan reservasi bisnis anda.",
    gallery: [
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400034/07.07.2026_10.48.10_REC_psznaw.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400029/07.07.2026_10.48.43_REC_tma7rt.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400032/07.07.2026_10.49.04_REC_qtqt9a.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400059/07.07.2026_10.49.49_REC_jpv6on.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783400037/07.07.2026_10.50.09_REC_vev6ez.png",
      "https://res.cloudinary.com/ja16ouoe/image/upload/v1783403905/07.07.2026_12.51.55_REC_v2tsft.png"
    ]
  }
];

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration to match Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="container-tight relative z-10">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl reveal">
            <span className="text-primary font-semibold tracking-widest text-sm uppercase mb-4 block">
              PORTFOLIO
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Portofolio Jasa Pembuatan Website & Sistem Zayrion Tech
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Kami tidak hanya membuat desain — kami mendesain pengalaman digital yang meningkatkan hasil bisnis Anda.
            </p>
          </div>
          <div className="mt-8 md:mt-0 hidden md:block reveal">
            <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition group">
              Konsultasi Proyek Anda
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* GRID 2 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group reveal relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] md:aspect-video transition-all hover:border-primary/50 hover:shadow-blue-glow backdrop-blur-sm cursor-pointer"
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/30 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-6 font-light">
                    {project.desc}
                  </p>
                  <button 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-primary px-5 py-2.5 rounded-xl backdrop-blur transition-colors opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    Lihat Case Study <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button Only */}
        <div className="mt-10 text-center md:hidden">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-8 py-4 text-base font-bold text-foreground hover:bg-white/10 transition-all w-full">
            Konsultasi Proyek Anda <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Case Study Dialog (Popup Gallery) */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden bg-background/95 backdrop-blur-3xl border-border/50 shadow-2xl">
          {selectedProject && (
            <div className="flex flex-col py-12 md:py-16">
              {/* Header */}
              <div className="px-6 md:px-12 text-center mb-10 md:mb-14">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-primary/20 shadow-blue-glow">
                  {selectedProject.category}
                </span>
                <DialogTitle className="text-2xl md:text-4xl font-bold text-foreground mb-4 font-display max-w-3xl mx-auto leading-tight">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                  {selectedProject.desc}
                </DialogDescription>
              </div>

              {/* Gallery Carousel */}
              <div className="w-full relative px-4 md:px-16">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4 md:-ml-8 items-center">
                    {selectedProject.gallery.map((img, i) => (
                      <CarouselItem key={i} className="pl-4 md:pl-8 basis-[85%] md:basis-[70%] lg:basis-[60%] flex items-center justify-center">
                        <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-2xl relative group transition-all duration-500 hover:shadow-blue-glow/50 hover:border-primary/50 w-full max-h-[60vh] flex justify-center">
                          <img 
                            src={img} 
                            alt={`${selectedProject.title} screenshot ${i + 1}`} 
                            loading="lazy"
                            className="w-full h-auto max-h-[60vh] object-contain transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border-white/20 bg-background hover:bg-primary hover:text-white transition-all shadow-lg" />
                    <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border-white/20 bg-background hover:bg-primary hover:text-white transition-all shadow-lg" />
                  </div>
                </Carousel>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};