import { Context, Middleware } from 'koa'
import { prisma } from '../../prisma/client'

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const userWithoutKeys = { ...user }
  keys.forEach((key) => delete userWithoutKeys[key])
  return userWithoutKeys as Omit<User, Key>
}

export const getUsers: Middleware = async (ctx: Context) => {
  const users = await prisma.user.findMany()

  const usersWithoutPassword = users.map((user) => exclude(user, ['password']))

  ctx.status = 200
  ctx.body = usersWithoutPassword
}
