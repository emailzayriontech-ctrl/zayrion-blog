import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/shared/Navbar";
import { Footer } from "@/components/sections/shared/Footer";
import { getAllPosts, getPostBySlug } from "@/data/blog";
import Link from "next/link";

export function generateStaticParams() {
  const articles = getAllPosts();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const article = getPostBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <article className="flex-1 container-tight pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-sm text-primary font-semibold hover:underline mb-8 inline-block">
            &larr; Kembali ke Blog
          </Link>
          <header className="mb-10">
            <span className="text-sm font-semibold text-primary/80 uppercase tracking-widest">{article.date}</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">{article.title}</h1>
          </header>
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
      <Footer />
    </main>
  );
}
