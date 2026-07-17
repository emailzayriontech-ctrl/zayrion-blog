import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

export async function POST(request: Request) {
  let client;
  try {
    const data = await request.json();
    
    if (!data.slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    client = await pool.connect();

    // Pastikan tabel blogs ada
    await client.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        slug VARCHAR(255) PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Upsert (Insert or Update)
    const jsonData = JSON.stringify(data);
    await client.query(`
      INSERT INTO blogs (slug, data)
      VALUES ($1, $2::jsonb)
      ON CONFLICT (slug) DO UPDATE
      SET data = EXCLUDED.data;
    `, [data.slug, jsonData]);

    return NextResponse.json({ success: true, message: 'Saved successfully to Database' });
  } catch (error: any) {
    console.error('Error saving blog data to DB:', error);
    return NextResponse.json({ error: `Failed to save data: ${error.message}` }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
