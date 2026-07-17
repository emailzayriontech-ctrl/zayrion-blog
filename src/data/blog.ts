import { Pool } from 'pg';

const pool = new Pool({ 
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

export interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category?: string;
  status?: string;
  author?: string;
  schemas?: any;
  metaTitle?: string;
  canonicalUrl?: string;
}

// 1. Fungsi untuk mengambil semua data blog dari Database
export async function getAllPosts(): Promise<BlogPost[]> {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT data FROM blogs');
    
    const allPostsData = result.rows
      .map((row) => {
        const data = row.data;
        return {
          slug: data.slug,
          ...data,
          excerpt: data.metaDescription || data.featuredSnippet || data.excerpt || "",
          coverImage: data.featuredImage || data.coverImage || "",
        } as BlogPost;
      })
      // Pastikan HANYA menampilkan yang statusnya Published
      .filter(post => !post.status || post.status === "Published");

    // Urutkan blog berdasarkan id (timestamp) atau tanggal terbaru
    return allPostsData.sort((a, b) => {
      if (a.id && b.id) return b.id - a.id;
      return a.date < b.date ? 1 : -1;
    });
  } catch (error: any) {
    if (error.message && error.message.includes('relation "blogs" does not exist')) {
      return [];
    }
    console.error("Error fetching all posts:", error);
    return [];
  } finally {
    if (client) client.release();
  }
}

// 2. Fungsi untuk mengambil satu data blog berdasarkan slug dari Database
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT data FROM blogs WHERE slug = $1', [slug]);
    
    if (result.rowCount === 0) return null;
    
    const data = result.rows[0].data;

    return {
      slug,
      ...data,
      excerpt: data.metaDescription || data.featuredSnippet || data.excerpt || "",
      coverImage: data.featuredImage || data.coverImage || "",
    } as BlogPost;
  } catch (error: any) {
    return null;
  } finally {
    if (client) client.release();
  }
}