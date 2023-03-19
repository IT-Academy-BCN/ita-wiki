import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) =>
    res(
      // Respond with a 204 status code
      ctx.status(204)
    )
  ),
]
