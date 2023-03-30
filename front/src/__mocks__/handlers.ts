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
 rest.post('http://localhost:8999/api/v1/auth/register', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json([
        {
          "email": "user@example.com",
          "password": "stringst",
          "name": "string",
          "dni": "string"
        }
      ])
    ))


]
