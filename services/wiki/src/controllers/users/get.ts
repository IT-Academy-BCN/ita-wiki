import { Context, Middleware } from 'koa'
import db from '../../db/knex'

export const getUsers: Middleware = async (ctx: Context) => {
  const users = await db('user').select('*')

  ctx.status = 200
  ctx.body = users
}
