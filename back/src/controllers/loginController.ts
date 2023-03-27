import Koa from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { NotFoundError, ValidationError } from '../helpers/errors'
import { checkPassword } from '../helpers/passwordHash'

const prisma = new PrismaClient()

export const loginController = async (ctx: Koa.Context) => {
  const { dni, password } = ctx.request.body

  const user = await prisma.user.findFirst({
    where: { dni: dni as string },
    select: { id: true, password: true },
  })

  if (!user) {
    throw new NotFoundError('User not found')
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
}
