import Koa, { Middleware } from 'koa'
import slugify from 'slugify'
import { MissingParamError } from '../../helpers/errors'
import db from '../../db/knex'
import { User } from '../../db/knexTypes'
import { createResourceTopics } from '../../helpers/wiki/createResourceTopics'

export const postResource: Middleware = async (ctx: Koa.Context) => {
  const { id: userId } = ctx.user as User
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { category_id, topics, ...rest } = ctx.request.body

  const resource = rest

  const slug = slugify(resource.title, { lower: true })

  if (topics.length === 0) throw new MissingParamError('topics')

  const resourceTopics = await db('topic').whereIn(
    'id',
    topics.map((id: any) => id)
  )

  await db('resource').insert({
    ...resource,
    user_id: userId,
    slug,
    created_at: new Date(),
    updated_at: new Date(),
    category_id,
  })

  await createResourceTopics(resource?.id, resourceTopics)

  ctx.status = 204
}
