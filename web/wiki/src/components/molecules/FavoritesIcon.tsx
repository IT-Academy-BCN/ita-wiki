import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Icon, colors } from '@itacademy/ui'
import { FC } from 'react'
import { usePutFavorites } from '../../openapi/openapiComponents'
import { type TFavorites, type TResource } from '../../types'

type TResourceFav = {
  resourceId: string
  isFavorite: boolean
  fromProfile?: boolean
}

export const FavoritesIcon: FC<TResourceFav> = ({
  resourceId,
  isFavorite,
  fromProfile,
}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const newFav = usePutFavorites({
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
    const variables = { body: { id } }
    newFav.mutate(variables)
  }

  return (
    <Icon
      name="favorite"
      onClick={() => handleFavorite(resourceId)}
      $fill={isFavorite ? 1 : 0}
      color={`${colors.gray.gray3}`}
      aria-label={
        isFavorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')
      }
      title={isFavorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')}
    />
  )
}
