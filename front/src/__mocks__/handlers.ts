import { rest } from 'msw'


export const handlers = [
  rest.post('http://localhost:8999/api/v1/auth/login', (req, res, ctx) =>
    res(ctx.status(204))
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
