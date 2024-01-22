import { Context, Middleware } from 'koa'
import { InvalidCredentials } from '../../utils/errors'
import { User } from '../../schemas'

export const validate: Middleware = async (ctx: Context) => {
  const { id } = ctx.state.user as Pick<User, 'id' | 'role'>

  if (!id) {
    throw new InvalidCredentials()
  }
  ctx.status = 200
  ctx.body = { id }
}
