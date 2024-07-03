import knex from 'knex'
import configs from './knexfile'
import { dbConfig } from '../config'

const config = configs[dbConfig.nodeEnv]

const db = knex(config)

export default db
