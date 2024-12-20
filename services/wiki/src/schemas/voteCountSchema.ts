import { z } from '../openapi/zod'

export const voteCountSchema = z.object({
  upvote: z.number().int().min(0).openapi({ example: 14 }),
  downvote: z.number().int().min(0).openapi({ example: 2 }),
  total: z.number().int().openapi({ example: 12 }),
  userVote: z.number().int().min(-1).max(1),
})
export const knexVoteCountSchema = z.object({
  upvote: z.number().int().min(0).openapi({ example: 14 }),
  downvote: z.number().int().min(0).openapi({ example: 2 }),
  total: z.number().int().openapi({ example: 12 }),
  user_vote: z.number().int().min(-1).max(1),
})
