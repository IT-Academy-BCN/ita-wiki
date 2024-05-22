import { User } from '@prisma/client'
import { ExtendedResourceWithFavorites } from './attachUserNamesToResources'

export type ExtendedFavoriteResourceWithName = ExtendedResourceWithFavorites & {
  user: { name: string; avatar: string | null }
}
export function markFavorites(
  resources: ExtendedFavoriteResourceWithName[],
  user: User | null
) {
  return resources.map((resource) => {
    let isFavorite = false
    if (user)
      isFavorite = !!resource.favorites.find(
        (favorite) => favorite.userId === user.id
      )
    return { ...resource, isFavorite }
  })
}
