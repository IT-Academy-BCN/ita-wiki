import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Icon } from '../atoms'
import { colors } from '../../styles'
import { favMutation } from '../../helpers/fetchers'
import { TFavorites, TResource } from '../../types'
import { TINDEX } from '../../locales/translationIndex'

type TResourceFav = {
  resourceId: string
  isFavorite: boolean
  fromProfile?: boolean
}

export const FavoritesIcon = ({
  resourceId,
  isFavorite,
  fromProfile,
}: TResourceFav) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const newFav = useMutation({
    mutationFn: favMutation,
    onSuccess: () => {
      const queryCacheGetResources = queryClient
        .getQueryCache()
        .findAll(['getResources'])

      const queryCacheGetResourcesByUser = queryClient
        .getQueryCache()
        .findAll(['getResourcesByUser'])

      const allQueryKeys = !fromProfile
        ? queryCacheGetResources
        : queryCacheGetResources.concat(queryCacheGetResourcesByUser)

      const queryKeys = allQueryKeys.map((q) => q.queryKey)

      queryKeys.forEach((queryKey) => {
        queryClient.setQueryData(
          queryKey,
          (data?: TResource[]) => {
            const newData = data?.map((resource) => {
              if (resource.id === resourceId) {
                return { ...resource, isFavorite: !resource.isFavorite }
              }
              return resource
            })
            return newData
          },
          { updatedAt: Date.now() }
        )
      })

      if (!isFavorite) {
        queryClient.invalidateQueries({
          queryKey: ['getFavorites'],
        })
      } else {
        const queryCacheGetFavorites = queryClient
          .getQueryCache()
          .findAll(['getFavorites'])
        const favQueryKeys = queryCacheGetFavorites.map((q) => q.queryKey)

        favQueryKeys.forEach((favQueryKey) => {
          queryClient.setQueryData(
            favQueryKey,
            (data?: TFavorites[]) => {
              const newData = data?.filter(
                (resource: TFavorites) => resource.id !== resourceId
              )
              return newData
            },
            { updatedAt: Date.now() }
          )
        })
      }
    },
  })

  const handleFavorite = (id: string) => {
    newFav.mutate(id)
  }

  return (
    <Icon
      name="favorite"
      onClick={() => handleFavorite(resourceId)}
      fill={isFavorite ? 1 : 0}
      color={`${colors.gray.gray3}`}
      aria-label={isFavorite ? t(TINDEX.REMOVE_FAV) : t(TINDEX.ADD_FAV)}
      title={isFavorite ? t(TINDEX.REMOVE_FAV) : t(TINDEX.ADD_FAV)}
    />
  )
}
