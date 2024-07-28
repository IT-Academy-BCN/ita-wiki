import { Middleware } from 'koa'
import { Context } from 'vm'
import { userIdSchema } from '../../../schemas/users/userSchema'
import { DeletedError, NotFoundError } from '../../../utils/errors'
import { userManager } from '../../../db/managers/userManager'

export const dashboardDeleteUser: Middleware = async (ctx: Context) => {
  const id = userIdSchema.parse(ctx.params.id)
  const user = await userManager.getUser(
    id,
    { fields: ['id', 'deletedAt'] },
    true
  )

  if (!user) {
    throw new NotFoundError('User not found')
  }

  if (user.deletedAt !== null) {
    throw new DeletedError('User already deleted')
  }
  await userManager.updateUserByIds({ deletedAt: new Date().toISOString() }, [
    id,
  ])

  ctx.status = 204
}
