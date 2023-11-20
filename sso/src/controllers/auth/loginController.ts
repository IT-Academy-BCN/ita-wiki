import { Context, Middleware } from 'koa'
import jwt from 'jsonwebtoken'
import { client } from '../../models/db'
import { appConfig } from '../../config'
import { checkPassword } from '../../utils/passwordHash'
import { InvalidCredentials } from '../../utils/errors'

export const loginController: Middleware = async (ctx: Context) => {
  const { dni, password } = ctx.request.body
  const userResult = await client.query(
    'SELECT id, password FROM users WHERE dni = $1',
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
  const authToken = jwt.sign({ id: user.id }, appConfig.jwtKey, {
    expiresIn: '15m',
  })
  const refreshToken = jwt.sign({ id: user.id }, appConfig.jwtKey, {
    expiresIn: '7d',
  })
  ctx.status = 200
  ctx.body = { authToken, refreshToken }
}
