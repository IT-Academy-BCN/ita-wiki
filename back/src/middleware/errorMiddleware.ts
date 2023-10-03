/* eslint-disable no-ex-assign */
import { Context, Next } from 'koa'
import { ZodError } from 'zod'
import pino from 'pino'
import {
  DuplicateDataError,
  UnauthorizedError,
  ValidationError,
} from '../helpers/errors'
import { PinoLogger } from '../helpers/PinoLogger'

const errorMiddleware =
  (options: { logger: pino.Logger }) => async (ctx: Context, next: Next) => {
    try {
      await next()
    } catch (error: any) {
      const logger = new PinoLogger(options.logger)
      if (error instanceof ZodError) {
        error = new ValidationError(error.errors)
      } else if (error?.errorInfo?.code === 'auth/id-token-expired') {
        error = new UnauthorizedError('refresh_token')
      } else if (error.code === 'P2002') {
        error = new DuplicateDataError(
          `Error, ${error.meta.target} already exists.`
        )
      }
      logger.logError(error.message)
      ctx.status = error.status || 500
      ctx.body = {
        message: error.messages || error.message || 'Something bad happened',
      }
    }
  }

// eslint-disable-next-line import/prefer-default-export
export { errorMiddleware }
