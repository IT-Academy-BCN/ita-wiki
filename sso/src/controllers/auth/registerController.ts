import { Context, Middleware } from 'koa'
import { UserRegister } from '../../schemas/auth/registerSchema'
import { client } from '../../models/db'
import { hashPassword } from '../../utils/passwordHash'
import { generateId } from '../../utils/cuidGenerator'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, email, password, itineraryId }: UserRegister = ctx.request.body
  const hashedPassword = await hashPassword(password)
  const id = generateId()

  const query = {
    text: 'INSERT INTO "user"(id, dni, email, password, user_meta, itinerary_id) VALUES($1, $2, $3, $4, $5, $6)',
    values: [id, dni, email, hashedPassword, '{}', itineraryId],
  }

  await client.query(query)

  ctx.status = 200
  ctx.body = { id }
}
