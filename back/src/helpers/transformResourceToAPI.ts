import { Vote } from '@prisma/client'
import { TResourceSchema } from '../schemas/resource/resourceSchema'

type TResource = TResourceSchema & {
  userId?: string
  user?: {
    name: string
  }
  vote: { userId?: string; vote: number }[]
  isFavorite?: boolean
}
export type TVoteCount = {
  upvote: number
  downvote: number
  total: number
  userVote: number
}

type TResourceWithVoteCount = TResource & {
  voteCount: TVoteCount
}
/**
 * Calculates the vote count based on an array of votes.
 *
 * This function computes the total count for upvotes, downvotes, and the
 * overall total (difference between upvotes and downvotes). If a userId is
 * provided, it also fetches the vote value of that specific user.
 *
 * @param vote An array of votes, each containing an optional userId and a vote value.
 * @param userId An optional userId for fetching the user's specific vote value.
 *
 * @returns An object representing the vote count with properties: upvote, downvote, total, and userVote.
 */
export function calculateVoteCount(vote: Partial<Vote>[], userId?: string) {
  let upvote = 0
  let downvote = 0
  let userVote = 0
  vote.forEach((_vote: Partial<Vote>) => {
    if (_vote.vote === 1) upvote += 1
    else if (_vote.vote === -1) downvote += 1
    if (userId && _vote.userId === userId) userVote = _vote.vote ?? 0
  })
  const voteCount = {
    upvote,
    downvote,
    total: upvote - downvote,
    userVote,
  }
  return voteCount
}
/**
 * Transforms a given resource to match the API's response schema.
 *
 * This function takes in a resource with associated votes and enriches it
 * with a `voteCount` property. The `voteCount` is derived by computing the
 * number of upvotes, downvotes, the total difference, and the vote value of
 * a specific user (if a userId is provided).
 *
 * @param resource The resource object with associated votes.
 * @param userId An optional userId to fetch the specific vote value of the user.
 *
 * @returns An enriched resource object containing the computed `voteCount`.
 */
export function transformResourceToAPI(
  resource: TResource,
  userId?: string
): TResourceWithVoteCount {
  const voteCount = calculateVoteCount(resource.vote, userId)
  return {
    ...resource,
    voteCount,
  }
}
