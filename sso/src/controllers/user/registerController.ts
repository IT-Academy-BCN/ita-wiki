import { Context, Middleware } from 'koa'
import { UserRegister } from '../../schemas/userSchema'
import { client } from '../../models/db'
import { hashPassword } from '../../utils/passwordHash'
import { generateId } from '../../utils/cuidGenerator'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, email, password }: UserRegister = ctx.request.body
  const hashedPassword = await hashPassword(password)
  const id = generateId()

  const query = {
    text: 'INSERT INTO users(id, dni, email, password, user_meta) VALUES($1, $2, $3, $4, $5)',
    values: [id, dni, email, hashedPassword, '{}'],
  }

  await client.query(query)

  ctx.status = 204
}
