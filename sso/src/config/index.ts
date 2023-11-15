import 'dotenv/config'
import z from 'zod'

const appConfigSchema = z.object({
  port: z.string(),
  jwtKey: z.string(),
  jwtExpiration: z.string(),
})

const dbConfigSchema = z.object({
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  pass: z.string(),
  link: z.string(),
})

const appConfig = {
  port: process.env.PORT ?? 8000,
  jwtKey: process.env.JWT_KEY ?? 'secret',
  jwtExpiration: process.env.JWT_EXPIRATION ?? '14d',
}

appConfigSchema.parse(appConfig)

const dbConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 5432,
  database: process.env.DB_NAME ?? 'ita_sso',
  user: process.env.DB_USER ?? 'postgres',
  pass: process.env.DB_PASS ?? 'postgres',
  link:
    process.env.DATABASE_URL ??
    'postgres://postgres:postgres@localhost:5432/postgres',
}

dbConfigSchema.parse(dbConfig)

const bcryptConfig = {
  saltRounds: 10,
}

export { appConfig, dbConfig, bcryptConfig }
