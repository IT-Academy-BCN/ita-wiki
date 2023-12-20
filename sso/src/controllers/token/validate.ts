import { Context, Middleware } from 'koa'
import { InvalidCredentials } from '../../utils/errors'

export const validate: Middleware = async (ctx: Context) => {
  const { id } = ctx

  if (!id) {
    throw new InvalidCredentials()
  } else {
    ctx.status = 200
    ctx.body = { id }
  }
}
