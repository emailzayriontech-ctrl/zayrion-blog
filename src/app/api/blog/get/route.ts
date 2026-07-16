import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const dirPath = path.join(process.cwd(), 'src', 'data', 'blog');
    const filePath = path.join(dirPath, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    return NextResponse.json({ blog: data });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
