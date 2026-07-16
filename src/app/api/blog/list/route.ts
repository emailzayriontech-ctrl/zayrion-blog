import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`SELECT data FROM blogs`;
    
    const blogs = result.rows.map(row => {
      const data = row.data;
      return {
        id: data.id || Date.now(),
        slug: data.slug,
        title: data.title || 'Untitled',
        category: data.category || 'blog',
        status: data.status || 'Draft',
        author: data.author || 'Admin',
        date: data.date || '',
      };
    });

    // Sort by id (timestamp) descending
    blogs.sort((a, b) => b.id - a.id);

    return NextResponse.json({ blogs });
  } catch (error: any) {
    if (error.message && error.message.includes('relation "blogs" does not exist')) {
      return NextResponse.json({ blogs: [] });
    }
    console.error('Error fetching blog list from DB:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
