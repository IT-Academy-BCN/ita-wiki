import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const patchUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body

  await prisma.user.update({
    where: { id },
    data: { ...newData },
  })

  ctx.status = 204
}
