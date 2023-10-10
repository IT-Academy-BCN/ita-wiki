import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Icon } from '../atoms'
import { colors } from '../../styles'
import { favMutation } from '../../helpers/fetchers'

type TResourceFav = {
  resourceId: string
  isFavorite: boolean
}

export const FavoritesIcon = ({ resourceId, isFavorite }: TResourceFav) => {
  const { slug } = useParams()
  const [favorite, setFavorite] = useState<boolean>(isFavorite)
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const newFav = useMutation({
    mutationFn: favMutation,

    onSuccess: () => {
      setFavorite(!favorite)
      queryClient.refetchQueries({
        queryKey: ['getFavorites', slug],
        type: 'active',
      })
    },
  })

  const handleFavorite = (id: string) => {
    newFav.mutate(id)
  }

  return (
    <Icon
      name="favorite"
      onClick={() => handleFavorite(resourceId)}
      fill={favorite ? 1 : 0}
      color={`${colors.gray.gray3}`}
      title={favorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')}
    />
  )
}
