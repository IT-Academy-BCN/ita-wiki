import Koa from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { UnauthorizedError, ValidationError } from '../helpers/errors'
import { checkPassword } from '../helpers/passwordHash'

const prisma = new PrismaClient()

export const loginController = async (ctx: Koa.Context) => {
  try {
    const { dni, password } = ctx.request.body

    const user = await prisma.user.findFirst({
      where: { dni },
      select: { id: true, password: true }
    })

    if (!user) {
      throw UnauthorizedError
    }

    const isPasswordValid = await checkPassword(password, user.password)

    if (!isPasswordValid) {
      throw ValidationError
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as Secret,
      { expiresIn: '1d' }
    )

    ctx.cookies.set('token', token, { httpOnly: true })

    ctx.status = 204
  } catch (error) {
    if (error === UnauthorizedError) {
      ctx.throw(401, 'Unauthorized')
    } else if (error === ValidationError) {
      ctx.throw(422, 'Invalid data')
    } else {
      console.error(error)
      ctx.throw(500, 'Internal server error')
    }
  }
}
