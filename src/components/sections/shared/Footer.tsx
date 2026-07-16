"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer 
      ref={footerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-[#050505] pt-24 pb-12 border-t border-white/5"
    >
      {/* Background Blur Gradient */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
      />
      
      {/* Mouse Glow Effect */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          background: `radial-gradient(circle 300px at center, hsl(var(--primary) / 0.12), transparent)`,
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="container-tight relative z-10">
        {/* Animated Divider */}
        <div className="animated-divider mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left Column */}
          <div className="md:col-span-4">
            <a href="#" className="font-display font-bold tracking-[0.18em] text-lg text-white">
              ZAYRION <span className="text-primary">TECH</span>
            </a>
            <p className="mt-4 text-white/90 font-medium">Premium Web & System Studio</p>
            <p className="mt-2 text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              Membantu bisnis bertumbuh dengan website & sistem yang efisien dan memikat customer.
            </p>
          </div>

          {/* Middle Columns */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-4">
            <div className="space-y-5">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/pricing" className="footer-link">Pricing</a></li>
                <li><a href="/portfolio" className="footer-link">Work</a></li>
                <li><a href="/blog" className="footer-link">Blog</a></li>
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#solution" className="footer-link">Website</a></li>
                <li><a href="#system" className="footer-link">System</a></li>
                <li><a href="#" className="footer-link">Redesign</a></li>
              </ul>
            </div>
            <div className="space-y-5 col-span-2 md:col-span-1">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:hello@zayriontech.com" className="footer-link break-all">hello@zayriontech.com</a>
                </li>
                <li>
                  <a href="https://wa.me/6285122953096" target="_blank" className="footer-link flex items-center gap-1 group/wa">
                    WhatsApp <ArrowUpRight className="h-3 w-3 transition-transform group-hover/wa:translate-x-0.5 group-hover/wa:-translate-y-0.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-8">
            <a
              href="https://wa.me/6285122953096"
              target="_blank"
              className="group relative px-7 py-3.5 bg-white rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 text-black transition-colors group-hover:text-white">Start Project</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
            
            <div className="flex gap-4">
              <a href="https://instagram.com/zayriontech" target="_blank" className="px-4 py-2 rounded-full border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-gray-500 hover:text-white text-xs font-bold">
                IG
              </a>
              <a href="https://threads.net/@zayriontech" target="_blank" className="px-4 py-2 rounded-full border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-gray-500 hover:text-white text-xs font-bold">
                TH
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-gray-600 font-bold">
          <p>© 2026 ZAYRION TECH. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};