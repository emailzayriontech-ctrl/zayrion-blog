import fs from 'fs';
import path from 'path';

// Tentukan path ke folder tempat menyimpan JSON blog
const blogDirectory = path.join(process.cwd(), 'src/data/blog');

// Interface standar untuk struktur data blog Anda
// (Silakan sesuaikan field-nya dengan struktur JSON asli Anda)
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category?: string;
}

// 1. Fungsi untuk mengambil semua data blog
export function getAllPosts(): BlogPost[] {
  // Cek apakah folder ada, jika tidak buat folder kosong agar tidak error
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.json')) // Pastikan hanya membaca file JSON
    .map((fileName) => {
      const slug = fileName.replace(/\.json$/, ''); // Mengambil slug dari nama file
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const data = JSON.parse(fileContents);

      return {
        slug,
        ...data,
      } as BlogPost;
    });

  // Urutkan blog berdasarkan tanggal terbaru
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 2. Fungsi untuk mengambil satu data blog berdasarkan slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.json`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);

    return {
      slug,
      ...data,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}