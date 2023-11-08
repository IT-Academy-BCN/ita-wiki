import { rest } from 'msw'
import { urls } from '../../constants'

export const voteHandlers = [
  rest.put(urls.vote, (req, res, ctx) => res(ctx.status(204))),
]

export const voteErrorHandlers = [
  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'User not found' }))
  ),
  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(404), ctx.json({ message: 'User or resource not found' }))
  ),
]
