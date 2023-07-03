import Koa from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../../prisma/client'
import { checkPassword } from '../../helpers/passwordHash'

export const loginController = async (ctx: Koa.Context) => {
  const { dni, password } = ctx.request.body
  const dniUpperCase = dni.toUpperCase()

  const user = await prisma.user.findUnique({
    where: { dni: dniUpperCase as string },
    select: { id: true, password: true, status: true },
  })

  if (!user) {
    ctx.status = 404
    ctx.body = { error: 'User not found' }
    return
  }

  if (user.status !== 'ACTIVE') {
    ctx.status = 403
    ctx.body = { error: 'Only active users can login' }
    return
  }

  const isPasswordValid = await checkPassword(password, user.password)

  if (!isPasswordValid) {
    ctx.status = 422
    ctx.body = { error: 'Invalid password' }
    return
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY as Secret, {
    expiresIn: '1d',
  })

  ctx.cookies.set('token', token, { httpOnly: true })

  ctx.status = 204
}
