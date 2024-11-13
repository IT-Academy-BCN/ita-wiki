// #### Knex migration ####

import { KnexResource, KRESOURCE } from '../../db/knexTypes'
import { TKnexResourceSchema } from '../../schemas/resource/resourceSchema'
import { ResourceWithUserName } from './attachUserNamesToResources'

type TKnexResource = TKnexResourceSchema & {
  userId?: string
  user?: {
    name: string
  }
  vote: { userId?: string; vote: number }[]
  isFavorite?: boolean
}
export type Vote = {
  user_id: string
  userId?: string // TODO, old prisma prperty delete when fully migrated to Knex
  resource_id: string
  vote: number
  created_at: Date
  updated_at: Date
}
export type TVoteCount = {
  upvote: number
  downvote: number
  total: number
  user_vote: number
}

export type TTopic = {
  id: string
  name: string
  category_id: string
  created_at: Date
  updated_at: Date
  slug: string
}

export type TCategory = {
  id: string
  name: string
  slug: string
  updated_at: Date
  created_at: Date
  media_id: string
}

type TKnexResourceWithVoteCount = TKnexResource & {
  vote_count: TVoteCount
}
export function knexCalculateVoteCount(
  votes: Partial<Vote>[],
  user_id?: string
) {
  let upvote = 0
  let downvote = 0
  let userVote = 0

  votes.forEach((_vote: Partial<Vote>) => {
    if (_vote.vote === 1) upvote += 1
    else if (_vote.vote === -1) downvote += 1
    if ((_vote.user_id === user_id || _vote.userId === user_id) && user_id)
      userVote = _vote.vote ?? 0
  })
  const voteCount = {
    upvote,
    downvote,
    total: upvote - downvote,
    user_vote: userVote,
  }
  return voteCount
}

function getResourceType(
  resourceType: KRESOURCE
): 'BLOG' | 'VIDEO' | 'TUTORIAL' {
  switch (resourceType) {
    case KnexResource.BLOG:
      return 'BLOG'
    case KnexResource.VIDEO:
      return 'VIDEO'
    case KnexResource.TUTORIAL:
      return 'TUTORIAL'
    default:
      throw new Error(`Invalid resource type: ${resourceType}`)
  }
}

export function knexTransformResourceToAPI(
  resource: ResourceWithUserName,
  user_id?: string
): TKnexResourceWithVoteCount {
  const voteCount = knexCalculateVoteCount(resource.vote, user_id)
  return {
    ...resource,
    vote_count: voteCount,
    resource_type: getResourceType(resource.resource_type),
  }
}
