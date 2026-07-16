import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'src', 'data', 'blog');
    
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ blogs: [] });
    }

    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));
    
    const blogs = files.map(file => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      return {
        id: data.id || Date.now(),
        slug: data.slug || file.replace('.json', ''),
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
  } catch (error) {
    console.error('Error fetching blog list:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
