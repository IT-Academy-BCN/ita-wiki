import { rest } from 'msw'
import { urls } from '../constants'
import { voteErrorHandlers, voteHandlers } from './handlers/vote'

export const handlers = [
  rest.post(urls.logIn, (req, res, ctx) => res(ctx.status(204))),

  // Handles a POST /register request
  rest.post(urls.register, (req, res, ctx) => res(ctx.status(204))),

  rest.post(urls.createResource, (req, res, ctx) => res(ctx.status(204))),

  rest.post(urls.postTopics, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true }))
  ),

  rest.patch(urls.patchTopics, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true }))
  ),

  rest.patch(urls.users, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true }))
  ),

  rest.get(urls.users, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: 'testId',
          email: 'usertest@example.cat',
          dni: '12345678L',
          name: 'Test Name',
          avatarId: 'testAvatar.jpg',
          specialization: 'react',
          status: 'ACTIVE',
          role: 'REGISTERED',
          createdAt: '2023-11-15T15:36:02.234Z',
          updatedAt: '2023-11-15T15:36:02.234Z',
        },
      ])
    )
  ),

  rest.get(urls.getMe, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          name: 'string',
          dni: 'string',
          email: 'user@example.cat',
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      ])
    )
  ),

  rest.get(urls.getCategories, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          name: 'React',
          slug: 'react',
        },
      ])
    )
  ),

  rest.get(urls.getTopics, (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')
    if (slug === 'react') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 'cli04v2l0000008mq5pwx7w5j',
            name: 'Listas',
            slug: 'listas',
            categoryId: 'clh78rhsk000008l0ahamgoug',
          },
          {
            id: 'cli04uxud000609k37w9phejw',
            name: 'Renderizado condicional',
            slug: 'renderizado-condicional',
            categoryId: 'clh78rhsk000008l0ahamgoug',
          },
        ])
      )
    }
    if (slug === 'empty-topics') {
      return res(ctx.status(200), ctx.json([]))
    }
    if (slug === 'invalid-slug') {
      return res(
        ctx.status(404),
        ctx.json({ message: 'No category found with this slug' })
      )
    }
    return res(ctx.status(200), ctx.json(undefined))
  }),

  rest.get(urls.getResources, (req, res, ctx) => {
    const categorySlug = req.url.searchParams.get('slug')
    if (categorySlug === 'emptyResource') {
      return res(ctx.status(200), ctx.json([]))
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 'resourceId',
          title: 'Resource Test',
          description: 'Resource Test Description',
          url: 'http://www.google.com',
          createdAt: '2023-02-17T03:07:00',
          updatedAt: '2023-05-17T03:07:00',
          user: {
            name: 'Test User Name',
            email: 'test@mail.com',
          },
          voteCount: {
            upvote: 6,
            downvote: 2,
            total: 1,
            userVote: 1,
          },
          isFavorite: 'false',
        },
      ])
    )
  }),
  rest.post(urls.createResource, (_, res, ctx) => res(ctx.status(204))),

  rest.patch(urls.updateResource, (_, res, ctx) => res(ctx.status(204))),
  rest.get(urls.getTypes, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(['Test type 1', 'Test type 2', 'Test type 3'])
    )
  ),

  rest.get(urls.getFavorites, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: 'favoriteId',
          title: 'My favorite title',
          slug: 'my-favorite',
          description: 'Favorite description',
          url: 'https://tutorials.cat/learn/javascript',
          resourceType: 'VIDEO',
          userId: 'userId',
          createdAt: '11/11/2011',
          updatedAt: '12/12/2012',
          status: 'NOT_SEEN',
          voteCount: {
            upvote: 3,
            downvote: 0,
            total: 3,
          },
          isFavorite: 'true',
        },
        {
          id: 'secondFavoriteId',
          title: 'My favorite title 2',
          slug: 'my-favorite-two',
          description: 'Favorite description two',
          url: 'https://tutorials.cat/learn/',
          resourceType: 'VIDEO',
          userId: 'userId',
          createdAt: '11/11/2011',
          updatedAt: '12/12/2012',
          status: 'NOT_SEEN',
          voteCount: {
            upvote: 3,
            downvote: 0,
            total: 3,
          },
          isFavorite: 'true',
        },
      ])
    )
  ),

  // eslint-disable-next-line consistent-return
  rest.get(`${urls.getFavorites}/:slug`, (req, res, ctx) => {
    const { slug } = req.params
    if (slug === 'react') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 'favoriteId',
            title: 'My favorite title',
            slug: 'my-favorite',
            description: 'Favorite description',
            url: 'https://tutorials.cat/learn/javascript',
            resourceType: 'VIDEO',
            userId: 'userId',
            createdAt: '11/11/2011',
            updatedAt: '12/12/2012',
            status: 'NOT_SEEN',
            voteCount: {
              upvote: 3,
              downvote: 0,
              total: 3,
            },
            isFavorite: 'true',
          },
        ])
      )
    }
    if (slug === 'slugWithoutFavs') {
      return res(ctx.status(200), ctx.json([]))
    }
  }),

  rest.put(urls.favorites, (_, res, ctx) => res(ctx.status(204))),

  rest.post(`${urls.postStatus}/test`, (_, res, ctx) => res(ctx.status(204))),

  rest.get(urls.getResourcesByUser, (req, res, ctx) => {
    const categorySlug = req.url.searchParams.get('category')
    if (categorySlug === 'emptyResource') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            resources: [],
          },
        ])
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        resources: [
          {
            id: 'resourceId',
            title: 'Resource title',
            slug: 'react',
            description: 'Resource description',
            url: 'https://reactjs.org/',
            user: {
              name: 'string',
              email: 'user@example.cat',
            },
            topics: [
              {
                topic: {
                  id: 'topicId1',
                  name: 'Topic 1',
                  slug: 'topic-1',
                  categoryId: 'categoryId1',
                },
              },
            ],
            voteCount: {
              upvote: 10,
              downvote: 2,
              total: 8,
            },
          },
        ],
      })
    )
  }),
  ...voteHandlers,
]

export const errorHandlers = [
  rest.get(urls.getCategories, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.post(urls.getTopics, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'Unauthorized: Missing token' }))
  ),

  rest.get(urls.getTopics, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.post(urls.getTopics, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Database error' }))
  ),

  rest.get(urls.getResources, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.put(urls.getResources, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.get(urls.getTypes, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.get(`${urls.getFavorites}/:slug`, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'User not found' }))
  ),
  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(404), ctx.json({ message: 'User or resource not found' }))
  ),
  rest.post(urls.postStatus, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'Error updating status' }))
  ),

  rest.get(urls.getResourcesByUser, (req, res, ctx) => {
    const categorySlug = req.url.searchParams.get('category')

    if (categorySlug === 'errorCase') {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal server error' })
      )
    }
    return res(ctx.status(401), ctx.json({ message: 'User not found' }))
  }),

  rest.get(urls.users, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  ...voteErrorHandlers,
]
