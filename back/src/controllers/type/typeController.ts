import Koa, { Middleware } from 'koa'
import { RESOURCE_TYPE } from '@prisma/client'

export const getTypes: Middleware = async (ctx: Koa.Context) => {
  const types: string[] = Object.keys(RESOURCE_TYPE)
  ctx.status = 200
  ctx.body = types
}
