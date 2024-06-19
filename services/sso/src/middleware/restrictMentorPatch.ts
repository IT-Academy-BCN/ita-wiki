import { Context, Middleware } from 'koa'
import { ForbiddenError, NotFoundError } from '../utils/errors'
import { userManager } from '../db/managers/userManager'

export const restrictMentorPatch: Middleware = async (ctx: Context, next) => {
  const userRole = ctx.state.user.role
  const userId = ctx.state.user.id
  const { id } = ctx.params
  const { role } = ctx.request.body

  if (userRole === 'MENTOR') {
    const mentor = await userManager.getUser(userId, {
      fields: ['itineraryId'],
    })
    const user = await userManager.getUser(id, { fields: ['itineraryId'] })
    if (!mentor || !user) {
      throw new NotFoundError('Mentor or user not found')
    }
    if (mentor.itineraryId !== user.itineraryId) {
      throw new ForbiddenError(
        'Mentors can only update users from the same itinerary'
      )
    }
    if (role) {
      throw new ForbiddenError('Mentors cannot modify the role field')
    }
  }

  await next()
}
