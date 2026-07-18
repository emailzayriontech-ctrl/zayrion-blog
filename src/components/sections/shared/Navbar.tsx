"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
// import { LanguageSwitcher } from "../../LanguageSwitcher";

export const Navbar = () => {
  const t = (k: string) => k; // mock translation for blog
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Beranda", href: "https://zayriontech.com/" },
    { label: "Tentang Kami", href: "https://zayriontech.com/#about" },
    { label: "Harga", href: "https://zayriontech.com/#pricing" },
    { label: "Portofolio", href: "https://zayriontech.com/#portfolio" },
    { label: "Blog", href: "/" },
    { label: "Kontak", href: "https://zayriontech.com/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container-tight flex h-16 items-center justify-between">
        <Link href="/" className="font-display font-bold tracking-[0.18em] text-sm">
          ZAYRION <span className="text-primary">TECH</span>
        </Link>
        <ul className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <Link 
                href={l.href} 
                className={`transition-colors ${pathname === l.href ? "text-primary font-semibold" : "hover:text-foreground"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {/* <LanguageSwitcher /> */}
          <Link
            href="https://zayriontech.com/#contact"
            className="hidden md:inline-flex rounded-full border border-primary/60 px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors backdrop-blur"
          >
            Mulai Proyek
          </Link>
        </div>
      </nav>
    </header>
  );
};