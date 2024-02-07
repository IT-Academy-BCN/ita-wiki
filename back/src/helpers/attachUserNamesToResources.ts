import { Favorites, Resource, Topic } from '@prisma/client'
import { ServiceFail } from './errors'
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
  | ResourceWithTopicsVote[]
  | ExtendedResourceWithFavorites[]
  | ExtendedResourceWithAvatar[]
export async function attachUserNamesToResources(resources: UnifiedResources) {
  const names = await ssoHandler.getUsersNameById(
    resources.map((resource) => resource.userId)
  )
  return resources.map((resource) => {
    const usersWithName = names.find((u) => u.id === resource.userId)
    if (!usersWithName) throw new ServiceFail()
    const updatedResource = {
      ...resource,
      user: {
        ...('user' in resource ? resource.user : {}),
        name: usersWithName.name,
      },
      favorites: 'favorites' in resource ? resource.favorites : [],
    }

    return updatedResource
  })
}
