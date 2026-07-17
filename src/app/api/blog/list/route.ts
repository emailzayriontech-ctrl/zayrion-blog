import { NextResponse } from 'next/server';
import { pool } from '@/data/db';

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT data FROM blogs');
    
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
    return NextResponse.json({ error: `Failed to fetch blogs: ${error.message}` }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
