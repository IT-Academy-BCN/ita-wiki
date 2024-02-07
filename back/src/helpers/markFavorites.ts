import { User } from '@prisma/client'
import { ExtendedResourceWithFavorites } from './attachUserNamesToResources'

type ExtendedFavoriteResourceWithName = ExtendedResourceWithFavorites & {
  user: { name: string }
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
