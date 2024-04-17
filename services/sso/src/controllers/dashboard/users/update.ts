import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'
import {
  optionalUserUpdateSchema,
  UserPatch,
} from '../../../schemas/users/userUpdateSchema'
import { NotFoundError } from '../../../utils/errors'
import { hashPassword } from '../../../utils/passwordHash'

export const dashboardUpdateUser: Middleware = async (ctx: Context) => {
  const id = ctx.params.id as string
  const data: UserPatch = ctx.request.body as UserPatch
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
