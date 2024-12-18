import Koa, { Middleware } from 'koa'
import { TResourcesListParamsSchema } from '../../schemas/resource/resourcesListParamsSchema'
import db from '../../db/knex'
import { User } from '../../db/knexTypes'
import { attachUserNamesToResourcesKnex } from '../../helpers/attachUserNamesToResources'
import {
  ExtendedFavoriteResourceWithNameKnex,
  markFavoritesKnex,
} from '../../helpers/markFavorites'
import { transformResourceToAPIKnex } from '../../helpers/transformResourceToAPI'
import { knexResourceGetSchema } from '../../schemas/resource/resourceGetSchema'

export const listResources: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User | null

  const {
    resourceTypes,
    topic: topicId,
    categorySlug,
    topicSlug,
    status,
    search,
  } = ctx.query as TResourcesListParamsSchema

  const resources = await db('resource')
    .leftJoin('topic_resource', 'resource.id', 'topic_resource.resource_id')
    .leftJoin('topic', 'topic.id', 'topic_resource.topic_id')
    .leftJoin('category', 'category.id', 'topic.category_id')
    .leftJoin('vote', 'resource.id', 'vote.resource_id')
    .leftJoin('favorites', 'resource.id', 'favorites.resource_id')
    .leftJoin('viewed_resource', 'resource.id', 'viewed_resource.resource_id')
    .whereExists(function () {
      this.select('*')
        .from('topic_resource')
        .leftJoin('topic', 'topic.id', 'topic_resource.topic_id') // Necesario para acceder a 'topic.id' y 'topic.slug'
        .leftJoin('category', 'category.id', 'topic.category_id') // Necesario para acceder a 'topic.id' y 'topic.slug'
        .whereRaw('topic_resource.resource_id = resource.id')
        .andWhere(function () {
          if (topicId) {
            this.where('topic.id', topicId)
          }
          if (topicSlug) {
            this.orWhere('topic.slug', topicSlug)
          }
          if (categorySlug) {
            this.where('category.slug', categorySlug)
          }
        })
    })
    .modify((query) => {
      if (user && status) {
        if (status === 'SEEN') {
          query.where('viewed_resource.user_id', user.id)
        }
        if (status === 'NOT_SEEN') {
          query.whereNot('viewed_resource.user_id', user.id)
        }
      }
    })
    .modify((query) => {
      if (resourceTypes && resourceTypes.length > 0) {
        query.where('resource.resource_type', resourceTypes)
      }

      if (search && search.trim().length >= 2) {
        query.where(function () {
          this.where('resource.title', 'ilike', `%${search}%`).orWhere(
            'resource.description',
            'ilike',
            `%${search}%`
          )
        })
      }
    })
    .modify((query) => {
      if (user !== null) {
        query.select(db.raw('json_agg(vote.user_id, vote.vote) AS vote'))
      } else {
        query.select(db.raw('json_agg(vote.vote) AS vote'))
      }
    })
    .select(
      'resource.*',
      // db.raw('json_agg(vote.*) AS vote')
      db.raw('json_agg(topic.*) AS topics')
      // db.raw('json_agg(favorites.*) AS favorites')
    )
    .modify((query) => {
      if (user && user.id) {
        query
          .where('favorites.user_id', user.id)
          .select(db.raw('json_agg(favorites.*) AS favorites'))
      } else {
        query.select(db.raw('json_build_array() AS favorites'))
      }
    })
    .groupBy('resource.id')

  if (resources.length === 0) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const resourcesWithUserName = await attachUserNamesToResourcesKnex(resources)

  const resourcesWithFavorites = markFavoritesKnex(
    resourcesWithUserName.filter(
      (resource): resource is ExtendedFavoriteResourceWithNameKnex =>
        'favorites' in resource
    ),
    user
  )

  const parsedResources = resourcesWithFavorites.map((resource) =>
    knexResourceGetSchema.parse(
      transformResourceToAPIKnex(resource, user ? user.id : undefined)
    )
  )

  ctx.status = 200
  ctx.body = parsedResources
}
