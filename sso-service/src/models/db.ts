import { Client } from 'pg'
import { dbConfig } from '../config'

export const client = new Client({
  host: dbConfig.host,
  port: +dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.pass,
})
