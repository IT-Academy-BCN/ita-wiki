import { Context, Middleware, Next } from 'koa'
import fs from 'fs'
import path from 'path'
import { swaggeruiUrl } from '../openapi/config'

export const serveOpenApiFile: Middleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  if (ctx.path === `${swaggeruiUrl}/openapi.yaml`) {
    const filePath = path.join(__dirname, '../..', 'openapi.yaml')

    await fs.promises.access(filePath, fs.constants.F_OK)
    ctx.type = 'text/yaml'
    ctx.body = fs.createReadStream(filePath)
  }
  await next()
}
