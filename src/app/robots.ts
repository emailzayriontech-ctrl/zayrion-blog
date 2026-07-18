import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/blog',
      disallow: '/blog/admin/',
    },
    sitemap: 'https://blog.zayriontech.com/blog/sitemap.xml',
  };
}
