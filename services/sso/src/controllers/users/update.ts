import { Context, Middleware } from 'koa'
import { hashPassword } from '../../utils/passwordHash'
import { TUserPatch } from '../../schemas'
import { NotFoundError } from '../../utils/errors'
import { userManager } from '../../db/managers/userManager'

export const updateUser: Middleware = async (ctx: Context) => {
  const { id } = ctx.params
  const requestBody = ctx.request.body
  const { authToken, ...restOfData } = requestBody
  const data: TUserPatch = authToken ? restOfData : requestBody

  const userResult = await userManager.findById(id, { fields: ['id'] })

  if (!userResult) {
    throw new NotFoundError('User not found')
  }
  if (data.password) {
    data.password = await hashPassword(data.password)
  }

  await userManager.updateUserByIds(data, [id])

  ctx.status = 204
}
