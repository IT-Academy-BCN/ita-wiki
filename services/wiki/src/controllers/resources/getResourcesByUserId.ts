import { User } from '@prisma/client'
import Koa, { Middleware } from 'koa'
// import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import {
  attachUserNamesToResources,
  markFavorites,
  transformResourceToAPI,
} from '../../helpers'
import { ExtendedFavoriteResourceWithName } from '../../helpers/markFavorites'
import db from '../../db/knex'

export const getResourcesByUserId: Middleware = async (ctx: Koa.Context) => {
  const user = ctx.user as User
  const categorySlug = ctx.query.categorySlug as string | undefined
  let resources = []

  const query = db('resource')
    .where('resource.user_id', user.id)
    .leftJoin('topic_resource', 'topic_resource.resource_id', 'resource.id')
    .leftJoin('topic', 'topic.id', 'topic_resource.topic_id')
    .leftJoin('vote', 'vote.resource_id', 'resource.id')
    .leftJoin('favorites', 'favorites.resource_id', 'resource.id')
    .select(
      'resource.*',
      db.raw('json_agg(favorites) as favorites'),
      db.raw('json_agg(vote) as votes'),
      db.raw('json_agg(topic) as topics')
    )
    .groupBy('resource.id')

  // normalmente entraba aqui, porque categorySlug era undefined
  if (!categorySlug) {
    // find resources by user id
    // resources = await prisma.resource.findMany({
    //   where: { userId: user.id },
    //   include,
    // })
    resources = await query
  } else {
    // find topics by slug and find resources by topics

    // const topicsInCategory = await prisma.topic.findMany({
    //   where: {
    //     category: {
    //       slug: categorySlug,
    //     },
    //   },
    // })
    // resources = await prisma.resource.findMany({
    //   where: {
    //     user: { id: { equals: user.id } },
    //     topics: {
    //       some: {
    //         topicId: {
    //           in: topicsInCategory.map(({ id }) => id),
    //         },
    //       },
    //     },
    //   },
    //   include,
    // })
    const categoryId = await db('category')
      .where({ slug: categorySlug })
      .first('id')

    const topicsInCategoryKnex = await db('topic')
      .where({ category_id: categoryId })
      .returning('id')

    query.whereIn(
      'topic_resource.topic_id',
      topicsInCategoryKnex.map(({ id }) => id)
    )

    resources = await query
  }
  console.log('resources', resources)

  if (resources.length === 0) {
    ctx.status = 200
    ctx.body = []
    return
  }

  const resourcesWithUserName = await attachUserNamesToResources(resources)
  const resourcesWithFavorites = markFavorites(
    resourcesWithUserName.filter(
      (resource): resource is ExtendedFavoriteResourceWithName =>
        'favorites' in resource
    ),
    user
  )

  const parsedResources = resourcesWithFavorites.map((resource) =>
    resourceGetSchema.parse(transformResourceToAPI(resource, user.id))
  )

  ctx.status = 200
  ctx.body = parsedResources
}

/*
FORMATO de response PRISMA: [
  {
    id: 'cm38hl95d0000vp8k423fjs4b',
    title: 'test-resource-1-blog',
    slug: 'test-resource-1-blog',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resourceType: 'BLOG',
    categoryId: 'cm38hfu7f0000vp342ru05hl7',
    createdAt: '2024-11-08T08:40:31.633Z',
    updatedAt: '2024-11-08T08:40:31.633Z',
    user: { name: 'testingUser', id: 'vwt15uwddul2afme75x6fs8q' },
    topics: [],
    voteCount: { upvote: 1, downvote: 0, total: 1, userVote: 1 },    isFavorite: true
  },
]
*/

/*
FORMATO DE resources dentro del if [
  {
    id: 'cm3eup1070000vpwg7kxuz6kv',
    title: 'test-resource-1-blog',
    slug: 'test-resource-1-blog',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resourceType: 'BLOG',
    userId: 'vwt15uwddul2afme75x6fs8q',
    categoryId: 'cm3etqo4d0000vpe0u6o5f4mv',
    createdAt: 2024-11-12T19:33:59.767Z,
    updatedAt: 2024-11-12T19:33:59.767Z,
    vote: [ [Object] ],
    topics: [],
    favorites: [ [Object] ]
  },

]
*/
