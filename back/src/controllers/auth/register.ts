import { Middleware, Context } from 'koa'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'
import { UserRegister } from '../../schemas/users/userRegisterSchema'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, password, name, email, specialization }: UserRegister =
    ctx.request.body

  const existingCategory = await prisma.category.findUnique({
    where: { id: specialization },
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
