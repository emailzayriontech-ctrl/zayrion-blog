import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const connectionString = process.env.POSTGRES_URL;
  
  // Clean connection string (remove sslmode)
  let cleanUrl = connectionString;
  if (connectionString) {
    try {
      const url = new URL(connectionString);
      url.searchParams.delete('sslmode');
      cleanUrl = url.toString();
    } catch (e) {}
  }

  const poolConfig = {
    connectionString: cleanUrl,
    ssl: cleanUrl?.includes('localhost') ? false : { rejectUnauthorized: false }
  };

  const pool = new Pool(poolConfig);
  let client;
  try {
    client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    return NextResponse.json({ 
      success: true, 
      time: res.rows[0].now,
      poolConfig: {
        ...poolConfig,
        connectionString: poolConfig.connectionString ? 'PRESENT (hidden for security)' : 'MISSING'
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      poolConfig: {
        ...poolConfig,
        connectionString: poolConfig.connectionString ? 'PRESENT (hidden for security)' : 'MISSING'
      }
    }, { status: 500 });
  } finally {
    if (client) client.release();
    await pool.end();
  }
}
