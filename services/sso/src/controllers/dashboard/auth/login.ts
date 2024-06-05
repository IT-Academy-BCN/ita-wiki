import { Context, Middleware } from 'koa'
import { client } from '../../../db/client'
import { User } from '../../../schemas'
import { UserLogin } from '../../../schemas/auth/loginSchema'
import { UserRole, UserStatus } from '../../../schemas/users/userSchema'
import { generateToken } from '../../../utils/jwtAuth'
import { InvalidCredentials, ForbiddenError } from '../../../utils/errors'
import { checkPassword } from '../../../utils/passwordHash'
import { checkRoleAccess } from '../../../utils/checkRoleAccess'
import { appConfig } from '../../../config'

export const dashboardLoginController: Middleware = async (ctx: Context) => {
  const { dni, password }: UserLogin = ctx.request.body
  const dniToUpperCase = dni.toUpperCase()
  const userResult = await client.query(
    'SELECT id, password, status, role FROM "user" WHERE dni = $1',
    [dniToUpperCase]
  )
  const user = userResult.rows[0] as Pick<
    User,
    'id' | 'password' | 'status' | 'role'
  >
  if (!user) {
    throw new InvalidCredentials()
  }
  const isValid = await checkPassword(password, user.password)
  if (!isValid) {
    throw new InvalidCredentials()
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new ForbiddenError('The user is Blocked')
  }
  if (user.status !== UserStatus.ACTIVE) {
    throw new ForbiddenError('Only active users can login')
  }
  if (!user.role) {
    throw new ForbiddenError()
  }
  checkRoleAccess(UserRole.MENTOR, user.role)
  const authToken = generateToken(user.id, 'auth')
  const refreshToken = generateToken(user.id, 'refresh')
  ctx.cookies.set('authToken', authToken, {
    httpOnly: true,
    maxAge: appConfig.authCookieExpiration,
  })
  ctx.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: appConfig.refreshCookieExpiration,
  })
  ctx.status = 204
}
