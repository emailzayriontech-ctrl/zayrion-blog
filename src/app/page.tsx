import { Navbar } from "@/components/sections/shared/Navbar";
import { Footer } from "@/components/sections/shared/Footer";
import { getAllPosts } from "@/data/blog";
import Link from "next/link";

export default function BlogList() {
  const articles = getAllPosts();
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 container-tight pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Blog & Artikel</h1>
          <p className="text-lg text-muted-foreground mb-12">Panduan, tips, dan insight seputar website dan teknologi untuk bisnis Anda.</p>
          
          <div className="space-y-8">
            {articles.map(article => (
              <article key={article.slug} className="p-6 md:p-8 rounded-2xl bg-card/20 border border-border/50 hover:border-primary/30 transition">
                <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">{article.date}</span>
                <h2 className="text-2xl font-display font-bold mt-2 mb-3">
                  <Link href={`/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-2">{article.excerpt}</p>
                <Link href={`/${article.slug}`} className="text-sm font-semibold text-primary hover:underline">
                  Baca selengkapnya &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
