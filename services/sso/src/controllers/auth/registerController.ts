import { Context, Middleware } from 'koa'
import { UserRegister } from '../../schemas/auth/registerSchema'
import { client } from '../../db/client'
import { hashPassword } from '../../utils/passwordHash'
import { generateId } from '../../utils/cuidGenerator'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, email, name, password, itineraryId }: UserRegister =
    ctx.request.body
  const dniToUpperCase = dni.toUpperCase()
  const hashedPassword = await hashPassword(password)
  const id = generateId()

  const query = {
    text: 'INSERT INTO "user"(id, dni, email, name, password, user_meta, itinerary_id) VALUES($1, $2, $3, $4, $5, $6, $7)',
    values: [
      id,
      dniToUpperCase,
      email,
      name,
      hashedPassword,
      '{}',
      itineraryId,
    ],
  }

  await client.query(query)

  ctx.status = 200
  ctx.body = { id }
}
