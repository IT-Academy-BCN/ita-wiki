import { Context, Middleware } from 'koa'
import { client } from '../../../models/db'
import { User } from '../../../schemas'
import { UserLogin } from '../../../schemas/auth/loginSchema'
import { UserRole, UserStatus } from '../../../schemas/users/userSchema'
import { generateToken } from '../../../utils/auth'
import { InvalidCredentials, ForbiddenError } from '../../../utils/errors'
import { checkPassword } from '../../../utils/passwordHash'
import { checkRoleAccess } from '../../../utils/checkRoleAccess'

export const dashboardLoginController: Middleware = async (ctx: Context) => {
  const expirationInMilliseconds = 86400000

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
  checkRoleAccess(UserRole.ADMIN, user.role)
  const authToken = generateToken(user.id, '15m')
  const refreshToken = generateToken(user.id, '7d')
  ctx.cookies.set('authToken', authToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })
  ctx.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })
  ctx.status = 204
}
