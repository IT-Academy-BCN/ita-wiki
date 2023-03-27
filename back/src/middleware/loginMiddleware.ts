import Koa from 'koa'
import { UserLoginSchema } from '../schemas/UserLoginSchema'
import { ValidationError } from '../helpers/errors'

export const validateUserLogin = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    const { body } = ctx.request
    const validatedBody = await UserLoginSchema.parseAsync(body)
    ctx.state.userLogin = validatedBody
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.throw(400, 'Bad Request', { details: error.message })
    }
    throw error
  }
}
