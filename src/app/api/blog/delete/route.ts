import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const result = await sql`DELETE FROM blogs WHERE slug = ${slug}`;
    
    if (result.rowCount && result.rowCount > 0) {
      return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
  } catch (error: any) {
    if (error.message && error.message.includes('relation "blogs" does not exist')) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    console.error('Error deleting blog from DB:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
