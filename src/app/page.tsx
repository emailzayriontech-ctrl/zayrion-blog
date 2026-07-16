import { Navbar } from "@/components/sections/shared/Navbar";
import { Footer } from "@/components/sections/shared/Footer";
import { getAllPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";

export default async function BlogList() {
  const articles = await getAllPosts();
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 container-tight pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Blog & Artikel</h1>
            <p className="text-lg text-muted-foreground">Panduan, tips, dan insight seputar website dan teknologi untuk bisnis Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map(article => (
              <article key={article.slug} className="group rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition overflow-hidden flex flex-col">
                {article.coverImage && (
                  <Link href={`/${article.slug}`} className="block relative h-48 md:h-56 w-full overflow-hidden bg-muted">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                )}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    {article.category && (
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-muted-foreground">{article.date}</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold mb-3">
                    <Link href={`/${article.slug}`} className="hover:text-primary transition-colors">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-6 line-clamp-3 flex-1 text-sm leading-relaxed">{article.excerpt}</p>
                  <Link href={`/${article.slug}`} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 mt-auto">
                    Baca selengkapnya &rarr;
                  </Link>
                </div>
              </article>
            ))}
            
            {articles.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-20 text-muted-foreground">
                Belum ada artikel yang dipublikasikan.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
