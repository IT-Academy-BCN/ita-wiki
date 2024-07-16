import knex from 'knex'
import configs from './knexfile'
import { appConfig } from '../config'

const config = configs[appConfig.nodeEnv]

if (!config) {
  throw new Error(
    `No knex configuration found for environment: ${appConfig.nodeEnv}`
  )
}
const db = knex(config)

export default db
