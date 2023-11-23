/* eslint-disable no-ex-assign */
import { Context, Next } from 'koa'
import { ZodError } from 'zod'
import { JsonWebTokenError } from 'jsonwebtoken'
import {
  InvalidParamError,
  InvalidToken,
  UnauthorizedError,
  ValidationError,
} from '../utils/errors'

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error: any) {
    if (error instanceof ZodError) {
      error = new ValidationError(error.errors)
    } else if (error?.errorInfo?.code === 'auth/id-token-expired') {
      error = new UnauthorizedError('refresh_token')
    } else if (error instanceof JsonWebTokenError) {
      error = new InvalidToken()
    } else if (error.code === '23503') {
      error = new InvalidParamError(error.constraint.split('_')[1])
    }
    ctx.status = error.status || 500
    ctx.body = {
      message: error.messages || error.message || 'Something bad happened',
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { errorMiddleware }
