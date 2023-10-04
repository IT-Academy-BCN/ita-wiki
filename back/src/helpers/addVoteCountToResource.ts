import { Resource } from '@prisma/client'

/**
 * Adds voteCount to a resource with votes. This is for resource getters to match the resourceGetSchema.
 * @param Resource with votes.
 * @returns Resource with voteCount.
 */
export function addVoteCountToResource(
  resource: Resource & { vote: { userId?: string; vote: number }[] },
  userId?: string
): Resource & {
  voteCount: {
    upvote: number
    downvote: number
    total: number
    userVote?: 'upvote' | 'downvote' | 'none'
  }
} {
  let upvote = 0
  let downvote = 0
  let userVote: 'upvote' | 'downvote' | 'none' | undefined
  resource.vote.forEach((vote: any) => {
    if (vote.vote === 1) upvote += 1
    else if (vote.vote === -1) downvote += 1
    if (userId) {
      if (vote.vote === 1) userVote = 'upvote'
      else if (vote.vote === -1) userVote = 'downvote'
    }
  })
  if (userId && !userVote) {
    userVote = 'none'
  }
  const voteCount = {
    upvote,
    downvote,
    total: upvote - downvote,
    ...{ userVote },
  }
  return {
    ...resource,
    voteCount,
  }
}
