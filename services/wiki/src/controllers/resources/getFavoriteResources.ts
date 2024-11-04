import Koa, { Middleware } from 'koa'
import { resourceFavoriteSchema } from '../../schemas'
import {
  attachUserNamesToResources,
  transformResourceToAPI,
} from '../../helpers'
import db from '../../db/knex'
import { User } from '../../db/knexTypes'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User

  const { categorySlug } = ctx.params

  const resources = await db('resource')
    .join('favorites', 'resource.id', '=', 'favorites.resource_id')
    .join('category', 'resource.category_id', '=', 'category.id')
    .where('favorites.user_id', user.id)
    .andWhere('category.slug', categorySlug)
    .select(
      'resource.id',
      'resource.title',
      'resource.slug',
      'resource.description',
      'resource.url',
      'resource.resource_type',
      'resource.user_id',
      'resource.created_at',
      'resource.updated_at',
      'resource.category_id'
    )

  const getTopics = (resourceId: string) =>
    db('topic')
      .join('topic_resource', 'topic.id', '=', 'topic_resource.topic_id')
      .where('topic_resource.resource_id', resourceId)
      .select('topic.name')

  const getVotes = (resourceId: string) =>
    db('vote').where('resource_id', resourceId).select('vote', 'user_id')

  await Promise.all(
    resources.map(async (resource) => {
      const [topics, votes] = await Promise.all([
        getTopics(resource.id),
        getVotes(resource.id),
      ])

      return {
        ...resource,
        topics,
        vote: votes,
      }
    })
  )
  if (resources.length === 0) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const resourcesWithUserName = await attachUserNamesToResources(resources)

  const resourcesWithIsAuthor = resourcesWithUserName.map((resource) => {
    const isAuthor = resource.user.id === user.id
    return { ...resource, isAuthor }
  })

  const parsedResources = resourcesWithIsAuthor.map((resource) =>
    resourceFavoriteSchema.parse({
      ...transformResourceToAPI(resource, user ? user.id : undefined),
      isAuthor: resource.isAuthor,
    })
  )

  ctx.status = 200
  ctx.body = parsedResources
}
