import path from 'path'
import { Knex } from 'knex'
import { dbConfig, testDbConfig } from '../config'

interface IKnexConfig {
  [key: string]: Knex.Config
}

const baseConfig = {
  client: 'pg',
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'migrations'),
    extension: 'ts',
  },
}

const configs: IKnexConfig = {
  development: {
    ...baseConfig,
    connection: {
      host: dbConfig.host,
      port: Number(dbConfig.port),
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.pass,
    },
  },
  test: {
    ...baseConfig,
    connection: {
      host: testDbConfig.host,
      port: Number(testDbConfig.port),
      database: testDbConfig.database,
      user: testDbConfig.user,
      password: testDbConfig.pass,
    },
  },
}

export default configs
