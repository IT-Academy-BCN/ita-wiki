import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const modifyUser: Middleware = async (ctx: Context) => {
  const { id, ...newData } = ctx.request.body

  const user = await prisma.user.findFirst({
    where: { id },
  })

  console.log('user: ', user)

  if (!user) {
    throw new NotFoundError('User not found')
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
  console.log('userDataUpdate: ', userDataUpdate)
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: userDataUpdate,
      })
    })
  } catch (error) {
    console.log('There was an error: ', error)
  }

  console.log('AFTER TRANSACTION')

  ctx.status = 204
}
