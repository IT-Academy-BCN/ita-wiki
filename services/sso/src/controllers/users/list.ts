import { Context, Middleware } from 'koa'
import { client } from '../../db/client'
import { UsersList } from '../../schemas/users/usersListSchema'

export const listUsers: Middleware = async (ctx: Context) => {
  const { id, fields } = ctx.state.query as UsersList
  const fieldsToSelect = fields.join(', ')
  const queryParams = id.map((_, index) => `$${index + 1}`).join(', ')
  const queryResult = await client.query(
    `SELECT  ${fieldsToSelect} FROM "user" WHERE id IN (${queryParams}) AND deleted_at IS NULL`,
    id
  )

  if (!queryResult.rowCount) {
    ctx.status = 200
    ctx.body = []
    return
  }
  const usersName = queryResult.rows.map((user) => ({
    id: user.id,
    name: user.name,
  }))
  ctx.status = 200
  ctx.body = usersName
}
