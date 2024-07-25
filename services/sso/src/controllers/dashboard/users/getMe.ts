import { Context, Middleware } from 'koa'
import { User } from '../../../schemas'
import { NotFoundError } from '../../../utils/errors'
import { userManager } from '../../../db/managers/userManager'

export const getMe: Middleware = async (ctx: Context) => {
  const { id } = ctx.state.user as Pick<User, 'id' | 'role'>

  const user = await userManager.findById(id, {
    fields: ['dni', 'email', 'name', 'role'],
  })

  if (!user) {
    throw new NotFoundError('User Not found')
  }

  ctx.status = 200
  ctx.body = user
}
