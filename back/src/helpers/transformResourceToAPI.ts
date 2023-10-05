import { z } from 'zod'
import { resourceSchema } from '../schemas'

const resourceSchemaIn = resourceSchema

type TResource = z.infer<typeof resourceSchemaIn> & {
  userId?: string
  user?: {
    name: string
  }
  vote: { userId?: string; vote: number }[]
}
type TVoteCount = {
  upvote: number
  downvote: number
  total: number
  userVote: number
}

type TResourceWithVoteCount = TResource & {
  voteCount: TVoteCount
}

/**
 * Adds voteCount to a resource with votes. This is for resource getters to match the resourceGetSchema.
 * @param Resource with votes.
 * @returns Resource with voteCount.
 */
export function transformResourceToAPI(
  resource: TResource & { vote: { userId?: string; vote: number }[] },
  userId?: string
): TResourceWithVoteCount {
  let upvote = 0
  let downvote = 0
  let userVote = 0

  resource.vote.forEach((vote: any) => {
    if (vote.vote === 1) upvote += 1
    else if (vote.vote === -1) downvote += 1
    if (userId) userVote = vote.vote
  })

  const voteCount = {
    upvote,
    downvote,
    total: upvote - downvote,
    userVote,
  }
  return {
    ...resource,
    voteCount,
  }
}
