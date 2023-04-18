import Koa, { Middleware } from 'koa'
import { prisma } from '../prisma/client'

export const createResource: Middleware = async (ctx: Koa.Context) => {
  try {
    const data = ctx.request.body
    await prisma.resource.create({ data })
    ctx.status = 204
  } catch (error) {
    ctx.status = 422
    ctx.body = { error: 'Invalid resource type' }
  }
}
