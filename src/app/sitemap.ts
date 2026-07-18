import { MetadataRoute } from 'next';
import { getAllPosts } from '@/data/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllPosts();
  
  const articleUrls = articles.map(article => ({
    url: `https://blog.zayriontech.com/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://blog.zayriontech.com/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...articleUrls,
  ];
}
