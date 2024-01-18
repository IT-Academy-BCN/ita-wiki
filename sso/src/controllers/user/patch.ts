import { Context, Middleware } from 'koa'
import { UserPatch } from '../../schemas/user/userPatchSchema'
import { client } from '../../models/db'
import { hashPassword } from '../../utils/passwordHash'

export const patchUser: Middleware = async (ctx: Context) => {
  const { id, authToken, ...data }: UserPatch = ctx.request.body
  if (data.password) {
    data.password = await hashPassword(data.password)
  }
  const updateParts = Object.entries(data).map(([key, value], index) => ({
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
