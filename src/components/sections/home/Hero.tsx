import { ArrowRight, Sparkles, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden pt-20 pb-16 md:pb-24">
      {/* Abstract Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      
      <div className="container-tight relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Badge */}
        <a 
          href="https://wa.me/6285122953096" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 hover:bg-primary/20 transition-colors backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('hero.badge')}</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        {/* Main Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-foreground max-w-4xl mb-6 whitespace-pre-line">
          <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground mb-2">{t('hero.subtitle1')}</span>
          {t('hero.titlePart1')}<span className="text-primary relative inline-block">{t('hero.titleHighlight')}</span>{t('hero.titlePart2')}
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.description')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a
            href="https://wa.me/6285122953096"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-blue-glow hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            {t('hero.ctaPrimary')}
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-card border border-border px-8 py-4 text-base font-semibold text-foreground hover:bg-muted transition-all w-full sm:w-auto"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>

        {/* Features micro-copy */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
              <Check className="w-3 h-3" />
            </div>
            {t('hero.feature1')}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
              <Check className="w-3 h-3" />
            </div>
            {t('hero.feature2')}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
              <Check className="w-3 h-3" />
            </div>
            {t('hero.feature3')}
          </div>
        </div>

      </div>
    </section>
  );
};
