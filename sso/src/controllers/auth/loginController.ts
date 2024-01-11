import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { UserLogin } from '../../schemas/auth/loginSchema'
import { generateToken } from '../../utils/auth'
import { InvalidCredentials } from '../../utils/errors'
import { checkPassword } from '../../utils/passwordHash'

export const loginController: Middleware = async (ctx: Context) => {
  const { dni, password }: UserLogin = ctx.request.body
  const dniToUpperCase = dni.toUpperCase()
  const userResult = await client.query(
    'SELECT id, password FROM "user" WHERE dni = $1',
    [dniToUpperCase]
  )
  const user = userResult.rows[0]
  if (!user) {
    throw new InvalidCredentials()
  }
  const isValid = await checkPassword(password, user.password)
  if (!isValid) {
    throw new InvalidCredentials()
  }
  const authToken = generateToken(user.id, '15m')
  const refreshToken = generateToken(user.id, '7d')
  ctx.status = 200
  ctx.body = { id: user.id, authToken, refreshToken }
}
