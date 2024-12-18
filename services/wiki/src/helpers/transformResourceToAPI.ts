// import { KnexResource } from '../db/knexTypes'
import { Vote } from '@prisma/client'
import { Vote as votito } from '../db/knexTypes'
import {
  TKnexResourceSchema,
  TResourceSchema,
} from '../schemas/resource/resourceSchema'

type TResource = TResourceSchema & {
  userId?: string
  user?: {
    name: string
  }
  vote: { userId?: string; vote: number }[]
  isFavorite?: boolean
}

type TResourceKnex = TKnexResourceSchema & {
  user_id?: string
  user?: {
    name: string
  }
  vote: { user_id?: string; vote: number }[]
  isFavorite?: boolean
}
export type TVoteCount = {
  upvote: number
  downvote: number
  total: number
  userVote: number
}
// export type Vote = {
//   user_id: string
//   userId: string // TODO, old prisma prperty delete when fully migrated to Knex
//   resource_id: string
//   vote: number
//   created_at: Date
//   updated_at: Date
// }

type TResourceWithVoteCount = TResource & {
  voteCount: TVoteCount
}

type TResourceWithVoteCountKnex = TResourceKnex & {
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
    if (_vote.userId === userId && userId) userVote = _vote.vote ?? 0
  })
  const voteCount = {
    upvote,
    downvote,
    total: upvote - downvote,
    userVote,
  }
  return voteCount
}
export function calculateVoteCountKnex(
  vote: Partial<votito>[],
  userId?: string
) {
  let upvote = 0
  let downvote = 0
  let userVote = 0
  vote.forEach((_vote: Partial<votito>) => {
    if (_vote.vote === 1) upvote += 1
    else if (_vote.vote === -1) downvote += 1
    if (_vote.user_id === userId && userId) userVote = _vote.vote ?? 0
  })
  const voteCount = {
    upvote,
    downvote,
    total: upvote - downvote,
    userVote,
  }
  return voteCount
}

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

export function transformResourceToAPIKnex(
  resource: TResourceKnex,
  userId?: string
): TResourceWithVoteCountKnex {
  const voteCount = calculateVoteCountKnex(resource.vote, userId)

  return {
    ...resource,
    voteCount,
  }
}
