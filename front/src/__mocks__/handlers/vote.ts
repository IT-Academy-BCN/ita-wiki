import { rest } from 'msw'
import { urls } from '../../constants'

export const voteHandlers = [
  rest.get(`${urls.vote}test`, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        upvote: 1,
        downvote: 0,
        total: 1,
        userVote: 1,
      })
    )
  ),
  rest.put(urls.vote, (_, res, ctx) => res(ctx.status(204))),
]

export const voteErrorHandlers = [
  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'User not found' }))
  ),
  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(404), ctx.json({ message: 'User or resource not found' }))
  ),
]
