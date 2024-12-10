import { User } from '@prisma/client'

import { User as usercito } from '../db/knexTypes'
import {
  ExtendedResourceWithFavorites,
  ExtendedResourceWithFavoritesKnex,
} from './attachUserNamesToResources'

export type ExtendedFavoriteResourceWithName = Omit<
  ExtendedResourceWithFavorites,
  'userId'
> & {
  user: { name: string; id: string; avatar: string | null }
}

export type ExtendedFavoriteResourceWithNameKnex = Omit<
  ExtendedResourceWithFavoritesKnex,
  'user_id'
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
        (favorite) => favorite.userId === user.id
      )
    return { ...resource, isFavorite }
  })
}

export function markFavoritesKnex(
  resources: ExtendedFavoriteResourceWithNameKnex[],
  user: usercito | null
) {
  return resources.map((resource) => {
    let isFavorite = false
    if (user)
      isFavorite = !!resource.favorites.find(
        (favorite) => favorite.user_id === user.id
      )
    return { ...resource, isFavorite }
  })
}
