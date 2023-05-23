import { Resource } from '@prisma/client'

/**
 * Adds voteCount to resources with votes. This is for resource getters to match the resourceGetSchema.
 * @param Resources with votes.
 * @returns Resources with voteCount.
 */
export function addVoteCountToResource(
  resources: (Resource & { vote: { vote: number }[] })[]
): Resource[] {
  return resources.map((resource: any) => {
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
  })
}
