import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Premium entrance animation
    tl.fromTo(
      logoRef.current,
      {
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power4.out"
      }
    )
      // Subtle pulse/glow while loading
      .to(logoRef.current, {
        scale: 1.02,
        duration: 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 0
      })
      // Sophisticated exit
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power4.in",
        delay: 0.1
      })
      .to(containerRef.current, {
        yPercent: -100, // geser ke atas
        opacity: 1,
        duration: 0.8,
        ease: "power4.inOut",
      }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
    >
      <div
        ref={logoRef}
        className="font-display font-bold tracking-[0.25em] text-2xl md:text-4xl text-white select-none"
      >
        ZAYRION <span className="text-primary">TECH</span>
      </div>
    </div>
  );
};
