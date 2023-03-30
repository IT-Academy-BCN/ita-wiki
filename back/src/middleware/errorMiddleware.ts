/* eslint-disable no-ex-assign */
import { Context, Next } from 'koa'
import { ZodError } from 'zod'
import { ValidationError, UnauthorizedError } from '../helpers/errors'

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error: any) {
    if (error instanceof ZodError) {
      error = new ValidationError(JSON.stringify(error.errors[0]))
    } else if (error?.errorInfo?.code === 'auth/id-token-expired') {
      error = new UnauthorizedError('refresh_token')
    }
    ctx.status = error.status || 500
    ctx.body = {
      message: error.messages || error.message || 'Something bad happened',
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { errorMiddleware }
