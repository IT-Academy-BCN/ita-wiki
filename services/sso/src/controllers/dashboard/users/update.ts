import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'
import { userIdSchema } from '../../../schemas/users/userSchema'

export const dashboardUpdateUser: Middleware = async (ctx: Context) => {
  const userId = userIdSchema.parse(ctx.params.userId)
  const updates = ctx.request.body

  const allowedUpdates = ['dni', 'email', 'name']

  const fieldsToUpdate = Object.keys(updates).filter((key) =>
    allowedUpdates.includes(key)
  )

  if (fieldsToUpdate.length === 0) {
    ctx.throw(400, 'No valid fields provided for update')
  }

  const queryParams = []
  const querySet = fieldsToUpdate
    .map((field, index) => {
      queryParams.push(updates[field])
      return `"${field}" = $${index + 1}`
    })
    .join(', ')

  const query = `
    UPDATE "user"
    SET ${querySet}
    WHERE id = $${queryParams.length + 1}
    RETURNING *;
  `

  queryParams.push(userId)
  const result = await client.query(query, queryParams)

  if (result.rows.length === 0) {
    ctx.throw(404, 'User not found')
  }

  ctx.status = 200
  const [user] = result.rows
  ctx.body = user
}
