import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'
import { hashPassword } from '../../helpers/passwordHash'

export const modifyUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body

  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  // Check if a new password is provided
  if (newData.password) {
    newData.password = await hashPassword(newData.password)
  }

  const userDataUpdate = {
    id,
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

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id },
      data: userDataUpdate,
    })
  })

  ctx.status = 204
}
