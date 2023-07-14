/* eslint-disable no-ex-assign */
import { Context, Next } from 'koa'
import { ZodError } from 'zod'
// eslint-disable-next-line prettier/prettier
import jwt from 'jsonwebtoken'
import { UnauthorizedError, ValidationError } from '../helpers/errors'

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error: any) {
    if (error instanceof ZodError) {
      error = new ValidationError(error.errors)
    } else if (error instanceof jwt.JsonWebTokenError) {
      ctx.status = 405
      ctx.body = { error: 'Token is not valid' }
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
