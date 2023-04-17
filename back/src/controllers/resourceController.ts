import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const createResource: Middleware = async (ctx: Koa.Context) => {
  const data = ctx.request.body
  await prisma.resource.create({ data })
  ctx.status = 204
}
