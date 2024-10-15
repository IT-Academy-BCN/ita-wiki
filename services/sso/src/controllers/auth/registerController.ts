import { Context, Middleware } from 'koa'
import { TUserRegister } from '../../schemas/auth/registerSchema'
import db from '../../db/knexClient'
import { hashPassword } from '../../utils/passwordHash'
import { generateId } from '../../utils/cuidGenerator'
import { userManager } from '../../db/managers/userManager'
import { DuplicateError } from '../../utils/errors'

export const registerController: Middleware = async (ctx: Context) => {
  const { dni, email, name, password, itineraryId }: TUserRegister =
    ctx.request.body
  const dniToUpperCase = dni.toUpperCase()
  const hashedPassword = await hashPassword(password)
  const id = generateId()

  const dniNotValid = await userManager.findByDni(dniToUpperCase, {
    fields: ['dni'],
  })
  const emailNotValid = await userManager.getUser(email, {
    fields: ['email'],
  })

  if (dniNotValid || emailNotValid) {
    throw new DuplicateError('email or dni already exists')
  }

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
