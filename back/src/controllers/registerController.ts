import { Middleware, Context } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../prisma/client'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, password, name, email } = ctx.request.body

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

  const user = await prisma.user.create({
    data: { dni: dni.toUpperCase(), password, name, email },
  })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY as Secret, {
    expiresIn: '1d',
  })
  ctx.cookies.set('token', token, { httpOnly: true })
  ctx.status = 204
}
