import { Context, Middleware } from 'koa'
import { UserRegister } from '../../schemas/auth/registerSchema'
import db from '../../db/knexClient'
import { hashPassword } from '../../utils/passwordHash'
import { generateId } from '../../utils/cuidGenerator'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, email, name, password, itineraryId }: UserRegister =
    ctx.request.body
  const dniToUpperCase = dni.toUpperCase()
  const hashedPassword = await hashPassword(password)
  const id = generateId()

  await db('user').insert({
    id,
    dni: dniToUpperCase,
    email,
    name,
    password: hashedPassword,
    user_meta: '{}',
    itinerary_id: itineraryId,
  })

  ctx.status = 200
  ctx.body = { id }
}
