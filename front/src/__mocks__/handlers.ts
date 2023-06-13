import { rest } from 'msw'
import { urls } from '../constants'
const categorySlug = 'react'
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

  rest.get(urls.getResources + `?category=${categorySlug}`, (req, res, ctx) => {
    const slug = req.url.searchParams.get(categorySlug)

    if (slug === 'emptyResource') {
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
      ctx.json([
        {
          resources: [
            {
              id: 'resourceId',
              title: 'Resource Test',
              description: 'Resource Test Description',
              url: 'http://www.google.com',
              user: {
                name: 'Test User Name',
                email: 'test@mail.com',
              },
              voteCount: {
                upvote: 6,
                downvote: 2,
                total: 4,
              },
            },
          ],
        },
      ])
    )
  }),

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
]

export const errorHandlers = [
  rest.get(urls.getCategories, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.get(urls.getResourcesByCategory, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'User not found' }))
  ),
]
