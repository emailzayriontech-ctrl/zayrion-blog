import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { Navbar } from "@/components/sections/shared/Navbar";
import { Footer } from "@/components/sections/shared/Footer";
import { getAllPosts, getPostBySlug } from "@/data/blog";
import Link from "next/link";
import Script from "next/script";

type Props = {
  params: { slug: string }
};

export async function generateStaticParams() {
  const articles = await getAllPosts();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await getPostBySlug(params.slug);
  
  if (!article) return { title: 'Not Found' };
  
  return {
    title: article.metaTitle || article.title,
    description: article.excerpt,
    alternates: {
      canonical: article.canonicalUrl || `https://blog.zayriontech.com/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.excerpt,
      url: `https://blog.zayriontech.com/${article.slug}`,
      siteName: 'Zayrion Tech',
      images: article.coverImage ? [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
        },
      ] : [],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author || 'Admin'],
    }
  };
}

export default async function BlogPost({ params }: Props) {
  const article = await getPostBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Menyatukan schema FAQ dan LocalBusiness jika ada
  let jsonLdSchemas = [];
  if (article.schemas) {
    if (article.schemas.faq) {
      jsonLdSchemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.schemas.faq.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }
    if (article.schemas.localBusiness) {
      jsonLdSchemas.push(article.schemas.localBusiness);
    }
  }

  return (
    <>
      {jsonLdSchemas.map((schema, index) => (
        <Script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <article className="flex-1 container-tight pt-32 pb-24">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="text-sm text-primary font-semibold hover:underline mb-8 inline-block">
              &larr; Kembali ke Blog
            </Link>
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                {article.category && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                )}
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{article.date}</span>
                {article.author && (
                  <span className="text-sm text-muted-foreground">&bull; by <span className="font-semibold text-foreground">{article.author}</span></span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">{article.title}</h1>
              
              {article.coverImage && (
                <div className="w-full mt-8 rounded-2xl overflow-hidden border">
                  <img src={article.coverImage} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
                </div>
              )}
            </header>
            
            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
