import post1 from "./kenapa-umkm-butuh-website.json";
import post2 from "./biaya-bikin-website-umkm-2026.json";
import post3 from "./bedanya-website-vs-sistem-aplikasi.json";

export interface BlogPostType {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

export const articles: BlogPostType[] = [
  post1,
  post2,
  post3
];
