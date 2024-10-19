import { Context, Middleware } from 'koa'
import { TUsersList } from '../../schemas/users/usersListSchema'
import { userManager } from '../../db/managers/userManager'

export const listUsers: Middleware = async (ctx: Context) => {
  const { id, fields } = ctx.state.query as TUsersList
  const usersName = await userManager.getUsersByIds({ fields }, true, id)

  ctx.status = 200
  ctx.body = usersName
}
