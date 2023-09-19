import { Middleware, Context } from 'koa'
import { prisma } from '../../prisma/client'
import { DuplicateDataError, NotFoundError } from '../../helpers/errors'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, password, name, email, specialization } = ctx.request.body

  const userByDni = await prisma.user.findUnique({
    where: { dni: dni.toUpperCase() as string },
    select: { id: true },
  })

  if (userByDni) throw new DuplicateDataError(`Error, DNI already exists.`)

  const userByEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (userByEmail) throw new DuplicateDataError(`Error, email already exists.`)

  const existingCategory = await prisma.category.findUnique({
    where: { id: specialization },
  })

  if (!existingCategory) throw new NotFoundError('Category not found')

  const user = await prisma.user.create({
    data: {
      dni: dni.toUpperCase(),
      password,
      name,
      email,
      specializationId: existingCategory.id,
    },
  })

  if (!user || user.dni !== dni.toUpperCase()) throw new Error()

  ctx.status = 204
}
