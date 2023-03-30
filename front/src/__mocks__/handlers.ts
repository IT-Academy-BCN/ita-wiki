import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) =>
    res(
      // Respond with a 204 status code
      ctx.status(204)
    )
  ),
  
  // Handles a POST /register request
  rest.post('auth/register', (req, res, ctx) =>
  res(
    // Respond with a 204 status code
    ctx.status(204)
  )
  ),
  rest.post('auth/register', (req, res, ctx) =>
    res(
      ctx.status(400)
    )
  ),
]
