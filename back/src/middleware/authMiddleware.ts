import Koa from 'koa'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { USER_ROLE } from '@prisma/client'
import { prisma } from '../prisma/client'
import { NotFoundError, ForbiddenError } from '../helpers/errors'

const rolePoints = {
  [USER_ROLE.ADMIN]: 100,
  [USER_ROLE.MENTOR]: 80,
  [USER_ROLE.REGISTERED]: 20,
}

const checkRoleAccess = (requiredRole: USER_ROLE, userRole: USER_ROLE) => {
  const requiredRolePoints = rolePoints[requiredRole]
  const userRolePoints = rolePoints[userRole]
  if (requiredRolePoints > userRolePoints) {
    throw new ForbiddenError()
  }
}
export const authMiddleware =
  (role?: USER_ROLE) => async (ctx: Koa.Context, next: Koa.Next) => {
    const token = ctx.cookies.get('token')
    if (!token) {
      ctx.status = 401
      ctx.body = { error: 'Unauthorized: Missing token' }
      return
    }

    try {
      const { userId } = jwt.verify(
        token,
        process.env.JWT_KEY as Secret
      ) as JwtPayload
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) throw new NotFoundError('User not found')

      if (role) {
        checkRoleAccess(role, user.role)
      }

      ctx.user = user
      await next()
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        ctx.status = 405
        ctx.body = { error: 'Token is not valid' }
      }
      // We don't want to catch Zod or controller errors
      else throw error
    }
  }
