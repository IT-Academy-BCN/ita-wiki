import { Middleware, Context } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import { Media, User } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { NotFoundError } from '../../helpers/errors'

export const authMeController: Middleware = async (ctx: Context) => {
  const token = ctx.cookies.get('token') as string
  const { userId } = jwt.verify(token, process.env.JWT_KEY as Secret) as {
    userId: string
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      dni: true,
      email: true,
      status: true,
      role: true,
      avatarId: true,
    },
  })

  if (!user) throw new NotFoundError('User not found')

  type UserWithAvatar = User & { avatar: Media }
  let userWithAvatar: UserWithAvatar | null = null
  let userAvatar: Media | null = null

  if (user?.avatarId) {
    userAvatar = await prisma.media.findUnique({
      where: { id: user.avatarId },
    })
    if (userAvatar) {
      userWithAvatar = { ...user, avatar: userAvatar } as UserWithAvatar
    }
  }

  ctx.status = 200
  ctx.body = userAvatar ? userWithAvatar : user
}
