const appConfig = {
  port: process.env.PORT || 8999,
  jwtKey: process.env.JWT_KEY || 'secret',
  jwtExpiration: process.env.JWT_EXPIRATION || '14d',
}

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  pass: process.env.DB_PASS || 'postgres',
  link:
    process.env.DB_LINK ||
    'postgres://postgres:postgres@localhost:5432/postgres',
}

const bcryptConfig = {
  saltRounds: 10
}

export { appConfig, dbConfig, bcryptConfig }
