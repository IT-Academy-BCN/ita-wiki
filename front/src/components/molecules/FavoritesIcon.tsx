import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Icon } from '../atoms'
import { colors } from '../../styles'
import { favMutation, TResource } from '../../helpers/fetchers'

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
                return { ...resource, isFavorite: !resource.isFavorite }
              }
              return resource
            })
            return newData
          },
          { updatedAt: Date.now() }
        )
      }

      const queryCacheGetFavorites = queryClient
        .getQueryCache()
        .findAll(['getFavorites'])
      const queryFavKeys = queryCacheGetFavorites.map((q) => q.queryKey)

      for (let i = 0; i < queryFavKeys.length; i += 1) {
        const favQueryKey = queryFavKeys[i]

        if (isFavorite) {
          queryClient.setQueryData(
            favQueryKey,
            (data?: TResource[]) => {
              const newData = data?.filter(
                (resource: TResource) => resource.id !== resourceId
              )
              return newData
            },

            { updatedAt: Date.now() }
          )
        } else if (!isFavorite) {
          queryClient.refetchQueries({
            queryKey: ['getFavorites'],
            type: 'active',
          })
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
