// // import { Client } from 'pg'
// import knex from 'knex'

// import { dbConfig } from '../config'

// // export const client = knex({
// //   client: 'pg',
// //   connection: {
// //     host: dbConfig.host,
// //     port: Number(dbConfig.port),
// //     database: dbConfig.database,
// //     user: dbConfig.user,
// //     password: dbConfig.pass,
// //   },
// // })

// const config = knex({
//   client: 'pg',
//   connection: {
//     host: dbConfig.host,
//     user: dbConfig.user,
//     password: dbConfig.pass,
//     database: dbConfig.database,
//   },
//   migrations: {
//     directory: './migrations',
//   },
//   seeds: {
//     directory: './seeds',
//   },
// })
// export { config }
