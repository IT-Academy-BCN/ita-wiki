// import { Prisma } from '@prisma/client'
import Koa, { Middleware } from 'koa'
// import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { TResourcesListParamsSchema } from '../../schemas/resource/resourcesListParamsSchema'

import db from '../../db/knex'
import {
  attachUserNamesToResources,
  ExtendedFavoriteResourceWithName,
  markFavorites,
  transformResourceToAPI,
} from '../../helpers'
import { User } from '../../db/knexTypes'
// import { UnifiedResources } from '../../helpers/attachUserNamesToResources'
// import { TResource } from '../../helpers/transformResourceToAPI'

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
  const queryFrom = ctx.query as TResourcesListParamsSchema

  let response
  const voteSelected =
    ctx.user !== null ? ['vote.user_id', 'vote.vote'] : ['vote.vote']
  // let statusCondition: Prisma.Enumerable<Prisma.ResourceWhereInput> = {}
  console.log('res0', user, queryFrom, status)
  if (user && status) {
    const viewedFilter = { 'viewed_resource.user_id': user.id }
    console.log('user/status:', status)

    if (status === 'SEEN') {
      if (search && search.trim().length >= 2) {
        response = await db('resource')
          .join('viewed_resource', 'resource.id', 'viewed_resource.resource_id')
          .leftJoin(
            'topic_resource',
            'resource.id',
            'topic_resource.resource_id'
          )
          .leftJoin('topic', 'topic_resource.topic_id', 'topic.id')
          .leftJoin('vote', 'resource.id', 'vote.resource_id')
          .join('category', 'category.id', 'topic.category_id')
          .where('category.slug', categorySlug)
          .where(viewedFilter)
          .andWhere('topic_resource', resourceTypes)
          .whereExists(function () {
            this.select()
              .from('topic')
              .where({ id: topicId })
              .orWhere({ slug: topicSlug })
              .orWhere({ category: categorySlug })
          })
          .whereLike('resource.title', `%${search}%`)
          .orWhereLike('resource.description', `%${search}%`)
          .select(
            'resource.*',
            ...voteSelected,
            db.raw('json_agg(topic.name) AS topics'),
            db.raw('json_agg(votes.*) AS vote'),
            db.raw('json_agg(favorites.*) AS favorites')
          )
      } else {
        response = await db('resource')
          .join('viewed_resource', 'resource.id', 'viewed_resource.resource_id')
          .leftJoin(
            'topic_resource',
            'resource.id',
            'topic_resource.resource_id'
          )
          .leftJoin('topic', 'topic_resource.topic_id', 'topic.id')
          .leftJoin('vote', 'resource.id', 'vote.resource_id')
          .join('category', 'category.id', 'topic.category_id')
          .where('category.slug', categorySlug)
          .andWhere(viewedFilter)
          .whereExists(function () {
            this.select()
              .from('topic')
              .where({ id: topicId })
              .orWhere({ slug: topicSlug })
              .orWhere({ category: categorySlug })
          })
          .andWhere('topic_resource', resourceTypes)
          .select(
            'resource.*',
            ...voteSelected,
            db.raw('json_agg(topic.name) AS topics'),
            db.raw('json_agg(votes.*) AS vote'),
            db.raw('json_agg(favorites.*) AS favorites')
          )
      }
    } else if (status === 'NOT_SEEN') {
      response = await db('resource')
        .join('viewed_resource', 'resource.id', 'viewed_resource.resource_id')
        .leftJoin('topic_resource', 'resource.id', 'topic_resource.resource_id')
        .leftJoin('topic', 'topic_resource.topic_id', 'topic.id')
        .leftJoin('vote', 'resource.id', 'vote.resource_id')
        .join('category', 'category.id', 'topic.category_id')
        .where('category.slug', categorySlug)
        .andWhere('topic_resource', resourceTypes)
        .whereExists(function () {
          this.select()
            .from('topic')
            .where({ id: topicId })
            .orWhere({ slug: topicSlug })
            .orWhere({ category: categorySlug })
        })
        .whereNot(viewedFilter)
        .select(
          'resource.*',
          ...voteSelected,
          'topic.* AS topics',
          'favorites.*'
        )
      console.log('2323', response)
    }
    console.log('status24', response, search)
  } else {
    console.log('ELSE')
    if (search && search.trim().length >= 2) {
      console.log('notuser/status+search:', search)
      response = await db('resource')
        .join('viewed_resource', 'resource.id', 'viewed_resource.resource_id')
        .leftJoin('topic_resource', 'resource.id', 'topic_resource.resource_id')
        .leftJoin('topic', 'topic_resource.topic_id', 'topic.id')
        .leftJoin('vote', 'resource.id', 'vote.resource_id')
        .join('category', 'category.id', 'topic.category_id')
        .andWhere('topic_resource', resourceTypes)
        .whereExists(function () {
          this.select()
            .from('topic')
            .where({ id: topicId })
            .orWhere({ slug: topicSlug })
            .orWhere({ category: categorySlug })
        })
        .whereLike('resource.title', `%${search}%`)
        .orWhereLike('resource.description', `%${search}%`)
        .select(
          'resource.*',
          db.raw('json_agg(topic.name) AS topics'),
          db.raw('json_agg(votes.*) AS vote'),
          db.raw('json_agg(favorites.*) AS favorites')
        )
    } else {
      console.log('notuser/status/search:')

      response = await db('resource')
        .leftJoin('topic_resource', 'resource.id', 'topic_resource.resource_id')
        .leftJoin('topic', 'topic.id', 'topic_resource.topic_id')
        .leftJoin('category', 'category.id', 'topic.category_id')
        .leftJoin('vote', 'resource.id', 'vote.resource_id')
        .where(function () {
          if (categorySlug) {
            this.where('category.slug', categorySlug)
          }
          if (topicId) {
            this.andWhere('topic.id', topicId)
          }
          if (topicSlug) {
            this.andWhere('topic.slug', topicSlug)
          }
        })
        // .where('resource.resource_type', resourceTypes)
        .groupBy('resource.id')
        .select(
          'resource.*',
          db.raw('json_agg(DISCTINCT vote.*) AS vote'), // Aggregates favorites fields into a JSON array
          db.raw('json_agg(DISTINCT topic.*) AS topics') // Aggregates all topic fields into a JSON array
        )
        .modify((query) => {
          // Conditionally select favorites only if they exist
          query
            .select(db.raw('json_agg(favorites.resource_id) AS favorites'))
            .having(db.raw('count(favorites.resource_id)'), '>', 0) // Include favorites only if there are any
        })
    }
    console.log('res4', response)
    console.log('topic4', response[0])
  }
  const resources = response as []
  if (resources.length === 0) {
    ctx.status = 200
    ctx.body = []
    return
  }
  console.log('res5', resources)
  const resourcesWithUserName = await attachUserNamesToResources(resources)
  console.log('res6', resourcesWithUserName)
  const resourcesWithFavorites = markFavorites(
    resourcesWithUserName.filter(
      (resource): resource is ExtendedFavoriteResourceWithName =>
        'favorites' in resource
    ),
    user
  )

  console.log('res8', resourcesWithFavorites)
  const parsedResources = resourcesWithFavorites.map((resource) =>
    resourceGetSchema.parse(
      transformResourceToAPI(resource, user ? user.id : undefined)
    )
  )

  ctx.status = 200
  ctx.body = parsedResources

  // console.log('final: ', query)

  /* resource = 
  {
    id: 'cm30hzlxd0006ry2oe1xdv6fx',
    title: 'test-resource-4-blog',
    slug: 'test-resource-4-blog',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resourceType: 'BLOG',
    userId: 'vwt15uwddul2afme75x6fs8x',
    categoryId: 'cm30hs0vp0000ry7oklnsywvv',
    createdAt: 2024-11-02T18:29:31.969Z,
    updatedAt: 2024-11-02T18:29:31.969Z,
    vote: [ [Object] ],
    topics: [ [Object] ],
    favorites: []
  }
    */
}
