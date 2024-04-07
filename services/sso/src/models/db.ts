import pg from 'pg'
import { dbConfig } from '../config'

export const client = new pg.Client({
  host: dbConfig.host,
  port: Number(dbConfig.port),
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.pass,
})
