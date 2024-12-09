import Koa, { Middleware } from 'koa'
import { NotFoundError } from '../../helpers/errors'
import db from '../../db/knex'
import { attachUserNamesToResources } from '../../helpers/wiki/attachUserNamesToResources'
import { knexTransformResourceToAPI } from '../../helpers/wiki/transformResourceToAPI'
import { knexResourceGetSchema } from '../../schemas/resource/resourceGetSchema'
import { User } from '../../db/knexTypes'

export const getResourcesById: Middleware = async (ctx: Koa.Context) => {
  const resourceId = ctx.params.id

  const user = ctx.user as User | null
  const voteSelect = user ? ['user_id as userId', 'vote'] : ['vote']

  const resource = await db('resource').where({ id: resourceId }).first()
  if (!resource) throw new NotFoundError('Resource not found')

  const votes = await db('vote')
    .where({ resource_id: resourceId })
    .select(voteSelect)
  const topics = await db('topic')
    .join('topic_resource', 'topic.id', 'topic_resource.topic_id')
    .where('topic_resource.resource_id', resourceId)
    .select('*')

  resource.topics = topics
  resource.vote = votes

  const usersWithName = await attachUserNamesToResources([resource])

  const resourceWithVote = knexTransformResourceToAPI(
    usersWithName[0],
    user ? user.id : undefined
  )

  const parsedResource = knexResourceGetSchema.parse(resourceWithVote)

  ctx.status = 200
  ctx.body = parsedResource
}
