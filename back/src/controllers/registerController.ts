import { Middleware, Context } from 'koa'
import { prisma } from '../prisma/client'
import jwt, { Secret } from 'jsonwebtoken'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, password, name, email } = ctx.request.body

  try {
    // Check DNI unique
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

    // Check Email unique
    const userByEmail = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true },
    })

    if (userByEmail) {
      ctx.status = 400
      ctx.body = {
        error: 'Email already exists',
      }
      return
    }

    // Register user in DB
    const user = await prisma.user.create({
      data: { dni, password, name, email },
    })

    // Return JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY as Secret, {
      expiresIn: '1d',
    })
    ctx.cookies.set('token', token, { httpOnly: true })
    ctx.status = 204
  } 
  catch (error) {
    ctx.status = 500
    ctx.body = { error }
  }
}
