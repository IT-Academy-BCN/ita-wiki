import Koa from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../../prisma/client'
import { checkPassword } from '../../helpers/passwordHash'
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../../helpers/errors'

export const loginController = async (ctx: Koa.Context) => {
  const { dni, password } = ctx.request.body
  const dniUpperCase = dni.toUpperCase()

  const user = await prisma.user.findUnique({
    where: { dni: dniUpperCase as string },
    select: { id: true, password: true, status: true },
  })

  if (!user) throw new NotFoundError('User not found')

  if (user.status !== 'ACTIVE')
    throw new ForbiddenError('Only active users can login')

  const isPasswordValid = await checkPassword(password, user.password)

  if (!isPasswordValid) throw new UnauthorizedError('Invalid password')

  const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY as Secret, {
    expiresIn: '1d',
  })

  ctx.cookies.set('token', token, { httpOnly: true })

  ctx.status = 204
}
