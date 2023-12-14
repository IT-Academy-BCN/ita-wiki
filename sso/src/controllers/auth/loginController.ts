import { Context, Middleware } from 'koa'
import { client } from '../../models/db'
import { checkPassword } from '../../utils/passwordHash'
import { InvalidCredentials } from '../../utils/errors'
import { generateToken } from '../../utils/auth'

export const loginController: Middleware = async (ctx: Context) => {
  const { dni, password } = ctx.request.body
  const userResult = await client.query(
    'SELECT id, password FROM "user" WHERE dni = $1',
    [dni]
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
