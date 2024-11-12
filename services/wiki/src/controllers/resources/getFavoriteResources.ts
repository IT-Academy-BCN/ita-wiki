import Koa, { Middleware } from 'koa'
import { attachUserNamesToResources } from '../../helpers/wiki/attachUserNamesToResources'
import { knexTransformResourceToAPI } from '../../helpers/wiki/transformResourceToAPI'
import db from '../../db/knex'
import { User } from '../../db/knexTypes'
import { knexResourceFavoriteSchema } from '../../schemas/resource/resourceFavoriteSchema'

export const getFavoriteResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const { categorySlug } = ctx.params
  if (!categorySlug) {
    ctx.status = 200
    ctx.body = []
    return
  }
  try {
    const resources = await db('resource')
      // eslint-disable-next-line func-names
      .whereExists(function () {
        this.select('*')
          .from('category')
          .where('category.slug', '=', categorySlug)
      })
      // eslint-disable-next-line func-names
      .whereExists(function () {
        this.select('*')
          .from('favorites')
          .where('favorites.user_id', '=', user.id)
      })
      .leftJoin('topic_resource', 'resource.id', 'topic_resource.resource_id')
      .leftJoin('topic', 'topic.id', 'topic_resource.topic_id')
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
        db.raw('json_agg(topic.*) AS topics'),
        db.raw('json_agg(vote.*) AS vote')
      )
      .groupBy('resource.id')

    if (resources.length === 0) {
      ctx.status = 200
      ctx.body = []
      return
    }
    const resourcesWithUserName = await attachUserNamesToResources(resources)

    const resourcesWithIsAuthor = resourcesWithUserName.map((resource) => {
      const isAuthor = resource.user?.id === user.id
      return { ...resource, isAuthor }
    })

    const parsedResources = resourcesWithIsAuthor
      .map((resource) => {
        try {
          const transformedResource = knexTransformResourceToAPI(
            resource,
            user ? user.id : undefined
          )

          return knexResourceFavoriteSchema.parse({
            ...transformedResource,
            isAuthor: resource.isAuthor,
          })
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error during resource parsing:', error)
          return null
        }
      })
      .filter((resource) => resource !== null)

    ctx.status = 200
    ctx.body = parsedResources
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      message: 'An error occurred while fetching favorite resources.',
    }
  }
}
