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
type ExtendedResourceWithAvatar = ResourceWithTopicsVote & {
  user: {
    avatarId: string | null
  }
}
type UnifiedResources =
  | ResourceWithTopicsVote
  | ExtendedResourceWithFavorites
  | ExtendedResourceWithAvatar

type ResourceWithUserName =
  | (ResourceWithTopicsVote & { user: { name: string } })
  | (ExtendedResourceWithFavorites & { user: { name: string } })
  | (ExtendedResourceWithAvatar & { user: { name: string } })

export async function attachUserNamesToResources(
  resources: UnifiedResources[]
) {
  const userIds = resources.map((resource) => resource.userId)
  const names = await ssoHandler.listUsers(userIds)
  return resources.reduce<ResourceWithUserName[]>((acc, resource) => {
    const user = names.find((u) => u.id === resource.userId)
    if (!user) return acc

    const updatedResource = {
      ...resource,
      user: {
        ...('user' in resource ? resource.user : { avatarId: null }),
        name: user.name,
      },
      favorites: 'favorites' in resource ? resource.favorites : [],
    }

    acc.push(updatedResource as ResourceWithUserName)
    return acc
  }, [])
}
