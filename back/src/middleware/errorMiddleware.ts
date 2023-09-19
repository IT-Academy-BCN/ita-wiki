/* eslint-disable no-ex-assign */
import { Context, Next } from 'koa'
import { ZodError } from 'zod'
import {
  DefaultError,
  UnauthorizedError,
  ValidationError,
} from '../helpers/errors'
import { logger } from '../helpers/index'

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error: any) {
    if (error instanceof ZodError) {
      error = new ValidationError(error.errors)
    } else if (error?.errorInfo?.code === 'auth/id-token-expired') {
      error = new UnauthorizedError('refresh_token')
    } else if (error.code === 'P2002') {
      error = new DefaultError(
        409,
        `Error, ${error.meta.target} already exists.`
      )
    }
    logger.error(error.stack)
    ctx.status = error.status || 500
    ctx.body = {
      message: error.messages || error.message || 'Something bad happened',
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { errorMiddleware }
