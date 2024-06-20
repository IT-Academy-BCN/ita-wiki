import { Context, Middleware } from 'koa'
import { ForbiddenError, NotFoundError } from '../utils/errors'
import { userManager } from '../db/managers/userManager'
import { UserRole } from '../schemas'

export const restrictMentorPatch: Middleware = async (ctx: Context, next) => {
  const userRole = ctx.state.user.role
  const userId = ctx.state.user.id
  const { id } = ctx.params
  const { role, status } = ctx.request.body

  if (userRole === 'MENTOR') {
    if (userId === id) {
      if (role || status) {
        throw new ForbiddenError('Mentors cannot modify their role or status')
      }
      await next()
      return
    }
    const mentor = await userManager.getUser(userId, {
      fields: ['itineraryId'],
    })
    const user = await userManager.getUser(id, {
      fields: ['itineraryId', 'role'],
    })
    if (!mentor || !user) {
      throw new NotFoundError('Mentor or user not found')
    }
    if (user.role !== UserRole.REGISTERED) {
      throw new ForbiddenError('Mentors can only update registered users')
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
