import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Tentukan direktori penyimpanan
    const dirPath = path.join(process.cwd(), 'src', 'data', 'blog');
    const filePath = path.join(dirPath, `${data.slug}.json`);

    // Pastikan direktori ada
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Tulis ke file JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: 'Saved successfully' });
  } catch (error) {
    console.error('Error saving blog data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
