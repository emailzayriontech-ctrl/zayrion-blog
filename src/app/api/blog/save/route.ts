import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Pastikan tabel blogs ada
    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        slug VARCHAR(255) PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Upsert (Insert or Update)
    const jsonData = JSON.stringify(data);
    await sql`
      INSERT INTO blogs (slug, data)
      VALUES (${data.slug}, ${jsonData}::jsonb)
      ON CONFLICT (slug) DO UPDATE
      SET data = EXCLUDED.data;
    `;

    return NextResponse.json({ success: true, message: 'Saved successfully to Database' });
  } catch (error) {
    console.error('Error saving blog data to DB:', error);
    return NextResponse.json({ error: 'Failed to save data to database' }, { status: 500 });
  }
}
