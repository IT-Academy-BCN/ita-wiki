import { Middleware } from 'koa'
import { Context } from 'vm'
import { userIdSchema } from '../../../schemas/users/userSchema'
import { DeletedError, NotFoundError } from '../../../utils/errors'
import { fetchUser, userManager } from '../../../db/managers/userManager'

export const dashboardDeleteUser: Middleware = async (ctx: Context) => {
  const id = userIdSchema.parse(ctx.params.id)
  const user = await fetchUser('id', id, { fields: ['id', 'deletedAt'] })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  console.log('user', user.deletedAt)
  if (user.deletedAt !== null) {
    throw new DeletedError('User already deleted')
  }
  await userManager.updateUserByIds({ deletedAt: new Date().toISOString() }, [
    id,
  ])

  ctx.status = 204
}
