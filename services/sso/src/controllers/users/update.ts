import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { hashPassword } from '../../utils/passwordHash'
import {
  UserPatch,
  optionalUserUpdateSchema,
  userUpdateSchema,
} from '../../schemas'
import { NotFoundError } from '../../utils/errors'
import { userIdSchema } from '../../schemas/users/userSchema'

export const updateUser: Middleware = async (ctx: Context) => {
  const id = userIdSchema.parse(ctx.params.id)
  const { authToken, ...data }: UserPatch = userUpdateSchema.parse(
    ctx.request.body
  )
  const userResult = await client.query('SELECT id FROM "user" WHERE id = $1', [
    id,
  ])
  if (!userResult.rows.length) {
    throw new NotFoundError('User not found')
  }
  if (data.password) {
    data.password = await hashPassword(data.password)
  }
  const validColumns: string[] = optionalUserUpdateSchema.keyof().options
  const updateParts = Object.entries(data)
    .filter(([key]) => validColumns.includes(key))
    .map(([key, value], index) => ({
      setPart: `${key} = $${index + 1}`,
      value,
    }))
  const updateSet = updateParts.map((part) => part.setPart).join(', ')
  const values = updateParts.map((part) => part.value)
  values.push(id)
  const updateQuery = `UPDATE "user" SET ${updateSet} WHERE id = $${values.length}`
  await client.query(updateQuery, values)
  ctx.status = 204
}
