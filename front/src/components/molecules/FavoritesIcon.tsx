import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Icon } from '../atoms'
import { colors } from '../../styles'
import { favMutation, TFavorites } from '../../helpers/fetchers'
import { TResource } from '../organisms/ResourceCardList'

type TResourceFav = {
  resourceId: string
  isFavorite: boolean
}

export const FavoritesIcon = ({ resourceId, isFavorite }: TResourceFav) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const newFav = useMutation({
    mutationFn: favMutation,
    onSuccess: () => {
      let theResource: TResource | null = null

      const queryCacheGetResources = queryClient
        .getQueryCache()
        .findAll(['getResources'])
      const queryKeys = queryCacheGetResources.map((q) => q.queryKey)

      for (let i = 0; i < queryKeys.length; i += 1) {
        const queryKey = queryKeys[i]

        queryClient.setQueryData(
          queryKey,
          (data?: TResource[]) => {
            const newData = data?.map((resource) => {
              if (resource.id === resourceId) {
                if (theResource === null) {
                  theResource = {
                    ...resource,
                    isFavorite: !resource.isFavorite,
                  }
                  return theResource
                }
                return { ...resource, isFavorite: !resource.isFavorite }
              }
              return resource
            })
            return newData
          },
          { updatedAt: Date.now() }
        )
      }

      const queryCacheGetFavs = queryClient
        .getQueryCache()
        .findAll(['getFavorites'])
      const queryFavKeys = queryCacheGetFavs.map((q) => q.queryKey)

      for (let i = 0; i < queryFavKeys.length; i += 1) {
        const favQueryKey = queryFavKeys[i]

        if (isFavorite) {
          queryClient.setQueryData(
            favQueryKey,
            (data?: TFavorites[]) => {
              const newData = data?.filter(
                (resource) => resource.id !== resourceId
              )
              return newData
            },
            { updatedAt: Date.now() }
          )
        }
        if (!isFavorite) {
          queryClient.setQueryData(
            favQueryKey,
            (data?: TFavorites[]) => {
              if (data) {
                const newFavData = [...data, theResource as TFavorites]
                return newFavData
              }
              return [theResource as TFavorites]
            },
            { updatedAt: Date.now() }
          )
        }
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
      aria-label={
        isFavorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')
      }
      title={isFavorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')}
    />
  )
}
