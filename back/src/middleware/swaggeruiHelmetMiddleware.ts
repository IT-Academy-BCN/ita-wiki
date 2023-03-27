import { swaggeruiUrl } from '../openapi/config'
import { Context, Next } from 'koa'

// Disables CSP for SwaggerUI 
export const swaggeruiHelmetMiddleware = (ctx:Context, next:Next) => {
    if(ctx.request.url === swaggeruiUrl){
      ctx.set('Content-Security-Policy', '')
    }
    next()
  }