import Koa, { Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const listBanners: Middleware = async (ctx: Koa.Context) => {
  const banners = await prisma.banners.findMany({
    select: { title: true, description: true, url: true },
  })
  ctx.status = 200
  ctx.body = banners
}
