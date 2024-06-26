import { Favorites, Resource, Topic } from '@prisma/client'
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
export type ExtendedResourceWithFavorites = ResourceWithTopicsVote & {
  favorites: Favorites[]
}

type UnifiedResources = ResourceWithTopicsVote | ExtendedResourceWithFavorites

export type ResourceWithUserName =
  | (Omit<ResourceWithTopicsVote, 'userId'> & {
      user: { name: string; id: string }
    })
  | (Omit<ExtendedResourceWithFavorites, 'userId'> & {
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
