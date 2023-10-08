import { useEffect, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Icon } from '../atoms'
import { colors } from '../../styles'
import { useGetFavorites } from '../../hooks/useGetFavorites'
import { TFavorites, favMutation } from '../../helpers/fetchers'

type TResourceSimplified = {
  resourceId: string
}

export const FavoritesWidget = ({ resourceId }: TResourceSimplified) => {
  const { slug } = useParams()
  const [favorite, setFavorite] = useState<boolean>(false)

  const { data } = useGetFavorites(slug)
  const favoritesData = { data }.data as TFavorites[] | undefined

  useEffect(() => {
    const calculateFav = (): boolean => {
      if (favoritesData)
        if (favoritesData)
          return favoritesData?.some((resource) => resource.id === resourceId)

      return false
    }
    const isFavorite = calculateFav()
    setFavorite(isFavorite)
  }, [favoritesData, resourceId])

  const queryClient = useQueryClient()

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
    <span>
      <Icon
        name="favorite"
        onClick={() => handleFavorite(resourceId)}
        fill={favorite ? 1 : 0}
        color={`${colors.gray.gray3}`}
        title={favorite ? `Eliminar de favoritos` : `Añadir a favoritos`}
      />
    </span>
  )
}
