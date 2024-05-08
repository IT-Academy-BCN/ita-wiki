import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { UserLogin } from '../../schemas/auth/loginSchema'
import { generateToken } from '../../utils/auth'
import { ForbiddenError, InvalidCredentials } from '../../utils/errors'
import { checkPassword } from '../../utils/passwordHash'
import { User, UserStatus } from '../../schemas/users/userSchema'

export const loginController: Middleware = async (ctx: Context) => {
  const { dni, password }: UserLogin = ctx.request.body
  const dniToUpperCase = dni.toUpperCase()
  const userResult = await client.query(
    `SELECT id, password, status, FROM "user" WHERE dni = $1 AND deleted_at IS NULL`,
    [dniToUpperCase]
  )
  const user = userResult.rows[0] as Pick<User, 'id' | 'password' | 'status'>
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
  const authToken = generateToken(user.id, '15m')
  const refreshToken = generateToken(user.id, '7d')
  ctx.status = 200
  ctx.body = { id: user.id, authToken, refreshToken }
}
