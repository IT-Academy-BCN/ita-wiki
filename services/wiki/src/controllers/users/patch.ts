import { Context, Middleware } from 'koa'
import { ssoHandler } from '../../helpers'
import { UserPatchSchema } from '../../schemas/users/userPatchSchema'

export const patchUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body as UserPatchSchema
  const authToken = ctx.cookies.get('authToken') as string
  await ssoHandler.updateUser({ id, authToken, ...newData })

  ctx.status = 204
}
