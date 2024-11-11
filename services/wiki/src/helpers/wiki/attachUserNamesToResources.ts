import { Favorites, Resource, Topic } from '../../db/knexTypes'
import { ssoHandler } from '../ssoHandler'

type ResourceWithTopicsVote = Resource & {
  topics: {
    topic: Topic
  }[]
  vote: {
    vote: number
    user_id?: string
  }[]
}
export type ExtendedResourceWithFavorites = ResourceWithTopicsVote & {
  favorites: Favorites[]
}

type UnifiedResources = ResourceWithTopicsVote | ExtendedResourceWithFavorites

export type ResourceWithUserName =
  | (Omit<ResourceWithTopicsVote, 'user_id'> & {
      user: { name: string; id: string }
    })
  | (Omit<ExtendedResourceWithFavorites, 'user_id'> & {
      user: { name: string; id: string }
    })

export async function attachUserNamesToResources(
  resources: UnifiedResources[]
) {
  const userIds = resources.map((resource) => resource.user_id)
  const names = await ssoHandler.listUsers(userIds)

  return resources.reduce<ResourceWithUserName[]>((acc, resource) => {
    const user = names.find((u: { id: string }) => u.id === resource.user_id)
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
