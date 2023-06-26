import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { paths, urls } from '../../constants'
import { Icon, Title, Link, Spinner, Text } from '../atoms'
import { useAuth } from '../../context/AuthProvider'
import { FlexBox, colors, dimensions } from '../../styles'
import { ResourceTitleLink } from '../molecules'

const StyledLink = styled(Link)`
  color: ${colors.gray.gray4};
  font-weight: 'regular';
`
const TitleContainer = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.xl};
`

const FavoritesContainer = styled(FlexBox)`
  align-items: flex-start;
  margin-bottom: ${dimensions.spacing.md};
`

type TFavorites = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  userId: string
  createdAt: string
  updatedAt: string
}

export const MyFavoritesList: FC = () => {
  const { user } = useAuth()
  const { userId } = useParams()

  const getFavorites = async (userIdParams: string) => {
    if (!user) {
      return []
    }
    const url = urls.getFavorites.replace(':userId', userIdParams)
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Error fetching favorite resources: ${res.statusText}`
          )
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(`Error fetching favorite resources: ${err.message}`)
      })
  }

  const { isLoading, data, error } = useQuery({
    queryKey: ['getFavorites', userId],
    queryFn: () => getFavorites(userId || ''),
  })

  if (error) return <p>Algo ha ido mal...</p>

  return (
    <>
      <TitleContainer data-testid="title">
        <Icon name="favorite" fill={0} />
        <Title as="h2" fontWeight="bold">
          Recursos favoritos
        </Title>
      </TitleContainer>
      {!user && (
        <Text color={colors.gray.gray4}>
          <StyledLink href={paths.register}>Regístrate</StyledLink> o{' '}
          <StyledLink href={paths.login}>inicia sesión</StyledLink> para añadir
          recursos favoritos
        </Text>
      )}
      {isLoading && user && <Spinner />}
      {user && data && (
        <div>
          {data.map((fav: TFavorites) => (
            <FavoritesContainer key={fav.id}>
              <ResourceTitleLink
                url={fav.url}
                title={fav.title}
                description={fav.description}
              />
            </FavoritesContainer>
          ))}
        </div>
      )}
      {user && !data && (
        <Text color={colors.gray.gray4}>
          No has añadido ningún recurso favorito
        </Text>
      )}
    </>
  )
}
