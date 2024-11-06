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
  console.log('category slug: ', categorySlug)

  const resources = await db('resource')
    .whereExists(function () {
      this.select('*')
        .from('category')
        .where('category.slug', '=', categorySlug)
    })
    .whereExists(function () {
      this.select('*')
        .from('favorites')
        .where('favorites.user_id', '=', user.id)
    })
    .leftJoin('topic_resource', 'resource.id', 'topic_resource.resource_id')
    .leftJoin('topic', 'topic_resource.topic_id', 'topic.id')
    .leftJoin('vote', 'resource.id', 'vote.resource_id')
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
      'resource.category_id',
      db.raw('json_agg(topic.name) AS topics'),
      db.raw('json_agg(DISTINCT vote.*) AS votes')
    )
    .groupBy('resource.id')

  console.log('resources: ', resources)

  if (resources.length === 0) {
    ctx.status = 200
    ctx.body = []
    return
  }
  console.log('HOLAAAAAAAA')
  const resourcesWithUserName = await attachUserNamesToResources(resources)
  console.log('CHAUUUUU')
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
