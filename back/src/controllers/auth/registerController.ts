import { Middleware, Context } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, password, name, email, specialization } = ctx.request.body

  const userByDni = await prisma.user.findUnique({
    where: { dni: dni.toUpperCase() as string },
    select: { id: true },
  })

  if (userByDni) {
    ctx.status = 400
    ctx.body = {
      error: 'DNI already exists',
    }
    return
  }

  const userByEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (userByEmail) {
    ctx.status = 400
    ctx.body = {
      error: 'Email already exists',
    }
    return
  }

  const existingCategory = await prisma.category.findUnique({
    where: { slug: specialization.toLowerCase() },
  })

  if (!existingCategory) {
    throw new NotFoundError('Category not found')

  }

  const user = await prisma.user.create({
    data: {
      dni: dni.toUpperCase(),
      password,
      name,
      email,
      specializationId: existingCategory.id,
    },
  })

  if (!user || user.dni !== dni.toUpperCase()) {
    ctx.status = 500
    ctx.body = {
      error: 'Database error',
    }
    return
  }

  ctx.status = 204
}
