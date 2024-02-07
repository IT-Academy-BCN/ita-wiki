import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { UsersGetId } from '../../schemas/users/usersGetNameByIdSchema'

export const getUsersIdNameController: Middleware = async (ctx: Context) => {
  const { id } = ctx.state.query as UsersGetId
  const queryParams = id.map((_, index) => `$${index + 1}`).join(', ')
  const usersResult = await client.query(
    `SELECT  id, name FROM "user" WHERE id IN (${queryParams})`,
    id
  )

  if (!usersResult.rowCount) {
    ctx.status = 200
    ctx.body = []
  }
  const usersWithName = usersResult.rows.map((user) => ({
    id: user.id,
    name: user.name,
  }))
  ctx.status = 200
  ctx.body = usersWithName
}
