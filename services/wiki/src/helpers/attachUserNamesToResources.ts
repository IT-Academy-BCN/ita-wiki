import { Resource } from '@prisma/client'
import { Favorites, Topic } from '../db/knexTypes'
import { ssoHandler } from './ssoHandler'

type ResourceWithTopicsVote = Resource & {
  // type ResourceWithTopicsVote = TResourceSchema & {
  topics: {
    topic: Topic
  }[]
  vote: {
    vote: number
    user_id?: string
    userid?: string
  }[]
}
export type ExtendedResourceWithFavorites = ResourceWithTopicsVote & {
  favorites: Favorites[]
}

export type UnifiedResources =
  | ResourceWithTopicsVote
  | ExtendedResourceWithFavorites

export type ResourceWithUserName =
  | (Omit<ResourceWithTopicsVote, 'userId'> & {
      // | (Omit<ResourceWithTopicsVote, 'user_id' & 'userId'> & {
      user: { name: string; id: string }
    })
  // | (Omit<ExtendedResourceWithFavorites, 'userId'> & {
  | (Omit<ExtendedResourceWithFavorites, 'user_id' & 'userId'> & {
      user: { name: string; id: string }
    })

export async function attachUserNamesToResources(
  resources: UnifiedResources[]
) {
  const userIds = resources.map((resource) => resource.user_id) as string[]
  const names = await ssoHandler.listUsers(userIds)
  console.log('names:', names)
  return resources.reduce<ResourceWithUserName[]>((acc, resource) => {
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

    acc.push(updatedResource as ResourceWithUserName)
    return acc
  }, [])
}
