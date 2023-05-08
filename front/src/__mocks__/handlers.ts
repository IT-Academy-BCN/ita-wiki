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

  rest.get(urls.getCategories, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          name: 'React',
        },
      ])
    )
  ),
]

export const errorHandlers = [
  rest.get(urls.getCategories, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),
]
