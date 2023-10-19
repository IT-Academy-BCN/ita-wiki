import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Icon, Spinner } from '../atoms'
import { colors } from '../../styles'
import { favMutation } from '../../helpers/fetchers'

type TResourceFav = {
  resourceId: string
  isFavorite: boolean
}

const SpinnerStyled = styled(Spinner)`
  margin: 0 auto;
`

export const FavoritesIcon = ({ resourceId, isFavorite }: TResourceFav) => {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [favorite, setFavorite] = useState<boolean>(isFavorite)
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  useEffect(() => {
    setIsLoading(true)
    const getFavoriteData = async () => {
      setFavorite(isFavorite)
      setIsLoading(false)
    }
    getFavoriteData()
  }, [isFavorite])

  const newFav = useMutation({
    mutationFn: favMutation,

    onSuccess: () => {
      setFavorite(!favorite)
      setIsLoading(false)
      queryClient.refetchQueries({
        queryKey: ['getFavorites', slug],
        type: 'active',
      })
    },
  })

  const handleFavorite = (id: string) => {
    newFav.mutate(id)
  }

  if (isLoading) return <SpinnerStyled size="xsmall" role="status" />

  return (
    <Icon
      name="favorite"
      onClick={() => handleFavorite(resourceId)}
      fill={favorite ? 1 : 0}
      color={`${colors.gray.gray3}`}
      aria-label={
        favorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')
      }
      title={favorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')}
    />
  )
}
