import { Pool } from "pg";

export const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_JKxWCYX0OIb3@ep-lively-dust-adx9l4cd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(30) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'customer'))
        )
        `);
  console.log("Database Connected");
};
