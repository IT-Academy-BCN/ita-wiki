import { Context, Middleware, Next } from 'koa'
import { swaggeruiUrl } from '../openapi/config'

// Disables CSP for SwaggerUI
export const swaggeruiCSPMiddleware: Middleware = async (
  ctx: Context,
  next: Next
) => {
  if (ctx.request.url === swaggeruiUrl) {
    ctx.set('Content-Security-Policy', '')
  }
  await next()
}
