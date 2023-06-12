import { Resource } from '@prisma/client'

/**
 * Adds voteCount to a resource with votes. This is for resource getters to match the resourceGetSchema.
 * @param Resource with votes.
 * @returns Resource with voteCount.
 */
export function addVoteCountToResource(
  resource: Resource & { vote: { vote: number }[] }
): Resource & {
  voteCount: { upvote: number; downvote: number; total: number }
} {
  const voteCount = { upvote: 0, downvote: 0, total: 0 }
  resource.vote.forEach((vote: any) => {
    voteCount.total += vote.vote
    if (vote.vote === 1) voteCount.upvote += 1
    else if (vote.vote === -1) voteCount.downvote += 1
  })
  return {
    ...resource,
    voteCount,
  }
}
