import Koa, { Middleware } from 'koa'
import jwt, { Secret } from 'jsonwebtoken'
import slugify from 'slugify'
import { prisma } from '../../prisma/client'
// import { CreateResource } from '../../interfaces/CreateResource'
import { MissingParamError } from '../../helpers/errors'
import { TResourceCreateSchema } from '../../schemas/resource/resourceCreateSchema'

export const createResource: Middleware = async (ctx: Koa.Context) => {
  const token = ctx.cookies.get('token') as string
  const { userId } = jwt.verify(token, process.env.JWT_KEY as Secret) as {
    userId: string
  }
  const resource: TResourceCreateSchema = ctx.request.body

  const slug = slugify(resource.title, { lower: true })

  const topicIds = resource.topics

  if (topicIds?.length === 0) throw new MissingParamError('topics')
  // if (!resource.topics) throw new MissingParamError('topics')

  const { topics, ...newData } = resource

  // resource.topics = {
  //   create: resource.topics.map((topicId: string) => ({
  //     topic: {
  //       connect: {
  //         id: topicId,
  //       },
  //     },
  //   })),
  // }

  await prisma.resource.create({
    data: {
      ...newData,
      userId,
      slug,
      topics: {
        create: topics.map((topicId: string) => ({
          topic: {
            connect: {
              id: topicId,
            },
          },
        })),
      },
    },
  })

  ctx.status = 204
}
