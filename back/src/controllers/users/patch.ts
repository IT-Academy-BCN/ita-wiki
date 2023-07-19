import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'

export const modifyUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body

  const userDataUpdate = {
    ...(newData.email && { email: newData.email }),
    ...(newData.dni && { dni: newData.dni }),
    ...(newData.password && { password: newData.password }),
    ...(newData.name && { name: newData.name }),
    ...(newData.status && { status: newData.status }),
    ...(newData.role && { role: newData.role }),
    ...(newData.specialization && { specialization: newData.specialization }),
    ...(newData.createdAt && { createdAt: newData.createdAt }),
    ...(newData.updatedAt && { updatedAt: newData.updatedAt }),
  }

  await prisma.user.update({
    where: { id },
    data: userDataUpdate,
  })

  ctx.status = 204
}
