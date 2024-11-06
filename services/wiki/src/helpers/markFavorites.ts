// import { User } from '@prisma/client'
import { User } from '../db/knexTypes'
import { ExtendedResourceWithFavorites } from './attachUserNamesToResources'

export type ExtendedFavoriteResourceWithName = Omit<
  ExtendedResourceWithFavorites,
  'userId' | 'user_id'
> & {
  user: { name: string; id: string; avatar: string | null }
}
export function markFavorites(
  resources: ExtendedFavoriteResourceWithName[],
  user: User | null
) {
  return resources.map((resource) => {
    let isFavorite = false
    if (user)
      isFavorite = !!resource.favorites.find(
        (favorite) =>
          favorite.userId === user.id || favorite.user_id === user.id
      )
    return { ...resource, isFavorite }
  })
}
