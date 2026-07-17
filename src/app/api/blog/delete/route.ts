import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ 
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

export async function DELETE(request: Request) {
  let client;
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    client = await pool.connect();
    const result = await client.query('DELETE FROM blogs WHERE slug = $1', [slug]);
    
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
    return NextResponse.json({ error: `Failed to delete blog: ${error.message}` }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
