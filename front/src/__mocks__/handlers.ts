import { rest } from 'msw'
import { urls } from '../constants'

export const handlers = [
  rest.post('http://localhost:8999/api/v1/auth/login', (req, res, ctx) =>
    res(ctx.status(204))
  ),

  // Handles a POST /register request
  rest.post('http://localhost:8999/api/v1/auth/register', (req, res, ctx) =>
    res(ctx.status(204))
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

  rest.put(urls.vote, (_, res, ctx) =>
    res(
      ctx.status(204),
      ctx.json([
        {
          voteCount: '1',
        },
      ])
    )
  ),

  rest.get(
    'http://localhost:8999/api/v1/favorites/by-user/:userId',
    (req, res, ctx) => {
      const favoriteSlug = req.url.searchParams.get('favorite')
      if (favoriteSlug === 'emptyFavoriteResource') {
        return res(
          ctx.status(200),
          ctx.json([
            {
              favorites: [],
            },
          ])
        )
      }
      return res(
        ctx.status(200),
        ctx.json({
          favorites: [
            {
              id: '1',
              title: 'Favorite title',
              slug: 'react',
              description: 'favorite resource',
              url: 'https://reactjs.org/',
              resourceType: 'documentation',
              userId: 'userIdTest',
              createdAt: '11/11/2011',
              updatedAt: '11/11/2011',
            },
          ],
        })
      )
    }
  ),
]

export const errorHandlers = [
  rest.get(urls.getCategories, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'User not found' }))
  ),
]
