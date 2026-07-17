import { Pool } from 'pg';

const getCleanPostgresUrl = () => {
  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) return undefined;
  try {
    const url = new URL(connectionString);
    url.searchParams.delete('sslmode');
    return url.toString();
  } catch (e) {
    return connectionString;
  }
};

const cleanPostgresUrl = getCleanPostgresUrl();

export const pool = new Pool({
  connectionString: cleanPostgresUrl,
  ssl: cleanPostgresUrl?.includes('localhost') ? false : { rejectUnauthorized: false }
});
