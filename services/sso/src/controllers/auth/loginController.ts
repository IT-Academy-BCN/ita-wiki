import { Context, Middleware } from 'koa'
import { UserLogin } from '../../schemas/auth/loginSchema'
import { generateToken } from '../../utils/jwtAuth'
import { ForbiddenError, InvalidCredentials } from '../../utils/errors'
import { checkPassword } from '../../utils/passwordHash'
import { UserStatus } from '../../schemas/users/userSchema'
import { userManager } from '../../db/managers/userManager'

export const loginController: Middleware = async (ctx: Context) => {
  const { dni, password }: UserLogin = ctx.request.body
  const dniToUpperCase = dni.toUpperCase()

  const user = await userManager.findByDni(dniToUpperCase, {
    fields: ['id', 'password', 'status'],
  })
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
  const authToken = generateToken(user.id, 'auth')
  const refreshToken = generateToken(user.id, 'refresh')
  ctx.status = 200
  ctx.body = { id: user.id, authToken, refreshToken }
}
