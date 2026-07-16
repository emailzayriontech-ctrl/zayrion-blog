import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const result = await sql`SELECT data FROM blogs WHERE slug = ${slug}`;
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog: result.rows[0].data });
  } catch (error: any) {
    if (error.message && error.message.includes('relation "blogs" does not exist')) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    console.error('Error fetching blog from DB:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
