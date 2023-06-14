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
  // eslint-disable-next-line consistent-return
  rest.get(urls.getTopics, (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')
    if (slug === 'react') {
      return res(
        ctx.status(200),
        ctx.json({
          topics: [
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
          ],
        })
      )
    }
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

  // eslint-disable-next-line consistent-return
  rest.get(urls.getTopics, (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')
    if (slug === 'invalid-slug') {
      return res(
        ctx.status(404),
        ctx.json({ message: 'No category found with this slug' })
      )
    }
  }),

  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'User not found' }))
  ),
]
