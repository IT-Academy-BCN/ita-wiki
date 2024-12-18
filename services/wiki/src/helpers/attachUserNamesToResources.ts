import { Resource, Topic, Favorites } from '@prisma/client'
import {
  Favorites as favorito,
  Topic as topico,
  Resource as resorcito,
} from '../db/knexTypes'
import { ssoHandler } from './ssoHandler'

type ResourceWithTopicsVote = Resource & {
  topics: {
    topic: Topic
  }[]
  vote: {
    vote: number
    userId?: string
  }[]
}

type ResourceWithTopicsVoteKnex = resorcito & {
  topics: {
    topic: topico
  }[]
  vote: {
    vote: number
    user_id?: string
  }[]
}

export type ExtendedResourceWithFavorites = ResourceWithTopicsVote & {
  favorites: Favorites[]
}
export type ExtendedResourceWithFavoritesKnex = ResourceWithTopicsVoteKnex & {
  favorites: favorito[]
}

type UnifiedResources = ResourceWithTopicsVote | ExtendedResourceWithFavorites

type UnifiedResourcesKnex =
  | ResourceWithTopicsVoteKnex
  | ExtendedResourceWithFavoritesKnex

export type ResourceWithUserName =
  | (Omit<ResourceWithTopicsVote, 'userId'> & {
      user: { name: string; id: string }
    })
  | (Omit<ExtendedResourceWithFavorites, 'userId'> & {
      user: { name: string; id: string }
    })

export type ResourceWithUserNameKnex =
  | (Omit<ResourceWithTopicsVoteKnex, 'use_id'> & {
      user: { name: string; id: string }
    })
  | (Omit<ExtendedResourceWithFavoritesKnex, 'user_id'> & {
      user: { name: string; id: string }
    })

export async function attachUserNamesToResources(
  resources: UnifiedResources[]
) {
  const userIds = resources.map((resource) => resource.userId)
  const names = await ssoHandler.listUsers(userIds)
  return resources.reduce<ResourceWithUserName[]>((acc, resource) => {
    const user = names.find((u) => u.id === resource.userId)
    if (!user) return acc

    const { userId, ...resourceWithoutUserId } = resource

    const updatedResource = {
      ...resourceWithoutUserId,
      user: {
        ...('user' in resource && resource.user ? resource.user : {}),
        id: userId,
        name: user.name,
      },
      favorites: 'favorites' in resource ? resource.favorites : [],
    }

    acc.push(updatedResource as ResourceWithUserName)
    return acc
  }, [])
}

export async function attachUserNamesToResourcesKnex(
  resources: UnifiedResourcesKnex[]
) {
  const userIds = resources.map((resource) => resource.user_id)
  const names = await ssoHandler.listUsers(userIds)
  return resources.reduce<ResourceWithUserNameKnex[]>((acc, resource) => {
    const user = names.find((u) => u.id === resource.user_id)
    if (!user) return acc

    const { user_id: userId, ...resourceWithoutUserId } = resource

    const updatedResource = {
      ...resourceWithoutUserId,
      user: {
        ...('user' in resource && resource.user ? resource.user : {}),
        id: userId,
        name: user.name,
      },
      favorites: 'favorites' in resource ? resource.favorites : [],
    }

    acc.push(updatedResource as ResourceWithUserNameKnex)
    return acc
  }, [])
}
