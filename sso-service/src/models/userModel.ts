import { client } from './db'

export const createUserTable = async () => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      user_meta JSON NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `)
}
