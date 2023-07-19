import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const modifyUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body

  const user = await prisma.user.findFirst({
    where: { id },
  })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ dni: newData.dni }, { email: newData.email }],
    },
  })

  if (existingUser) {
    let message: String = ''
    if (existingUser.dni === newData.dni) {
      message = 'DNI already exists'
    }
    if (existingUser.email === newData.email) {
      message = 'email already exists'
    }
    ctx.status = 400
    ctx.body = {
      error: message,
    }
    return
  }

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

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id },
      data: userDataUpdate,
    })
  })

  ctx.status = 204
}
