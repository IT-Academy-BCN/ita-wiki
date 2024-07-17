import { Knex } from 'knex'
import { dbConfig, testDbConfig } from '../config'

interface IKnexConfig {
  [key: string]: Knex.Config
}

const configs: IKnexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: dbConfig.host,
      port: Number(dbConfig.port),
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.pass,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: testDbConfig.host,
      port: Number(testDbConfig.port),
      database: testDbConfig.database,
      user: testDbConfig.user,
      password: testDbConfig.pass,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
}

export default configs
