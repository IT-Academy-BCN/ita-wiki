import z from 'zod'

const appConfigSchema = z.object({
  port: z.string(),
  jwtKey: z.string(),
  jwtExpiration: z.string(),
  ssoUrl: z.string(),
  nodeEnv: z.string(),
})
const appConfig = appConfigSchema.parse({
  port: process.env.PORT ?? 8999,
  jwtKey: process.env.JWT_KEY ?? 'secret',
  jwtExpiration: process.env.JWT_EXPIRATION ?? '14d',
  ssoUrl: process.env.SSO_URL ?? 'http://localhost:8000',
  nodeEnv: process.env.NODE_ENV ?? 'development',
})
const dbConfigSchema = z.object({
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  pass: z.string(),
  link: z.string(),
})
const bcryptConfig = {
  saltRounds: 10,
}
const dbConfig = dbConfigSchema.parse({
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? 5432,
  database: process.env.DB_NAME ?? 'ita_wiki',
  user: process.env.DB_USER ?? 'postgres',
  pass: process.env.DB_PASS ?? 'postgres',
  link:
    process.env.DATABASE_URL ??
    'postgres://postgres:postgres@localhost:5432/postgres',
})

const testDbConfig = dbConfigSchema.parse({
  host: process.env.TEST_DB_HOST ?? dbConfig.host,
  port: process.env.TEST_DB_PORT ?? dbConfig.port,
  database: process.env.TEST_DB_NAME ?? dbConfig.database,
  user: process.env.TEST_DB_USER ?? dbConfig.user,
  pass: process.env.TEST_DB_PASS ?? dbConfig.pass,
  link: process.env.TEST_DATABASE_URL ?? dbConfig.link,
})
export { appConfig, dbConfig, bcryptConfig, testDbConfig }
