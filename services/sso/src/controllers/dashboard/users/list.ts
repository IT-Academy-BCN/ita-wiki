import { Context, Middleware } from 'koa'
// import { queryBuilder } from '../../../utils/queryBuilder'
import { User, UserRole } from '../../../schemas'
import db from '../../../db/knexClient'
import { knexQueryBuilder } from '../../../utils/knex.queryBuilder'

export const dashboardListUsers: Middleware = async (ctx: Context) => {
  const { role, id } = ctx.state.user as Pick<User, 'id' | 'role'>
  let mentorUserId: string | undefined
  if (role === UserRole.MENTOR) {
    mentorUserId = id
  }
  console.log('Contexto.state:', ctx.state)
  // No llega la query
  // Contexto.state: {
  //   user: { id: 'q28v1k1h9g8uk0pwzaek2hhx', role: 'ADMIN', status: 'ACTIVE' },
  //   query: {}
  // }

  // const { query, queryParams } = queryBuilder(ctx.state.query, mentorUserId)
  // MIGRATION TO KNEX =>
  const { query } = knexQueryBuilder(ctx, db, mentorUserId)

  const queryResult = await query

  if (!queryResult.length) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const usersList = queryResult
  ctx.status = 200
  ctx.body = usersList
}
