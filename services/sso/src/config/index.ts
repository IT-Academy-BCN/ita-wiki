import 'dotenv/config'
import z from 'zod'
import ms from 'ms'

const parseDuration = (value: string) => ms(value)

const appConfigSchema = z
  .object({
    port: z.string(),
    authJwtKey: z.string(),
    refreshJwtKey: z.string(),
    authJwtExpiration: z.string(),
    refreshJwtExpiration: z.string(),
    authCookieExpiration: z.string().transform(parseDuration),
    refreshCookieExpiration: z.string().transform(parseDuration),
  })
  .strict()

const dbConfigSchema = z.object({
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  pass: z.string(),
  link: z.string(),
  nodeEnv: z.string(),
})

const appConfig = appConfigSchema.parse({
  port: process.env.PORT,
  authJwtKey: process.env.AUTH_JWT_KEY,
  refreshJwtKey: process.env.REFRESH_JWT_KEY,
  authJwtExpiration: process.env.AUTH_JWT_EXPIRATION,
  refreshJwtExpiration: process.env.REFRESH_JWT_EXPIRATION,
  authCookieExpiration: process.env.AUTH_COOKIE_EXPIRATION,
  refreshCookieExpiration: process.env.REFRESH_COOKIE_EXPIRATION,
})

const dbConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 5432,
  database: process.env.DB_NAME ?? 'ita_sso',
  user: process.env.DB_USER ?? 'postgres',
  pass: process.env.DB_PASS ?? 'postgres',
  link:
    process.env.DATABASE_URL ??
    'postgres://postgres:postgres@localhost:5432/postgres',
  nodeEnv: process.env.NODE_ENV ?? 'development',
}

dbConfigSchema.parse(dbConfig)

const bcryptConfig = {
  saltRounds: 10,
}

export { appConfig, dbConfig, bcryptConfig }
