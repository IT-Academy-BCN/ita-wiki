import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { hashPassword } from '../../utils/passwordHash'
import {
  UserPatch,
  optionalUserPatchSchema,
  userPatchSchema,
} from '../../schemas'

export const patchUser: Middleware = async (ctx: Context) => {
  const { id, authToken, ...data }: UserPatch = userPatchSchema.parse(
    ctx.request.body
  )
  if (data.password) {
    data.password = await hashPassword(data.password)
  }
  const validColumns: string[] = optionalUserPatchSchema.keyof().options
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
