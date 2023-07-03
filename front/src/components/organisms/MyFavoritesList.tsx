import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { urls } from '../../constants'
import { Icon, Title, Spinner, Text } from '../atoms'
import { useAuth } from '../../context/AuthProvider'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Modal, ResourceTitleLink } from '../molecules'
import Login from './Login'
import Register from './Register'

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

const StyledText = styled(Text)`
  font-weight: ${font.regular};
  line-height: 1.3;
`

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const StyledSpinner = styled(Spinner)`
  width: 70px;
  height: 70px;
  border-width: 15px;
`
const favs = [
  {
    id: 'favoriteId',
    title: 'My favorite title',
    slug: 'my-favorite',
    description: 'Favorite description',
    url: 'https://tutorials.cat/learn/javascript',
    resourceType: 'VIDEO',
    userId: 'userId',
    createdAt: '11/11/2011',
    updatedAt: '12/12/2012',
  },
]
export const MyFavoritesList: FC = () => {
  const { user } = useAuth()
  const { userId } = useParams()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

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

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <>
      <TitleContainer data-testid="title">
        <Icon name="favorite" fill={0} />
        <Title as="h2" fontWeight="bold">
          Recursos favoritos
        </Title>
      </TitleContainer>
      {!user && (
        <StyledText color={colors.gray.gray4}>
          <TextDecorationStyled onClick={handleRegisterModal}>
            Regístrate
          </TextDecorationStyled>
          {` o `}
          <TextDecorationStyled onClick={handleLoginModal}>
            inicia sesión
          </TextDecorationStyled>
          {` para añadir recursos favoritos`}
        </StyledText>
      )}
      {isLoading && user && <StyledSpinner role="status" />}

      {user &&
        !isLoading &&
        !error &&
        (data && data.length < 0 ? (
          favs.map((fav: TFavorites) => (
            <FavoritesContainer key={fav.id}>
              <ResourceTitleLink
                url={fav.url}
                title={fav.title}
                description={fav.description}
              />
            </FavoritesContainer>
          ))
        ) : (
          <Text color={colors.gray.gray4}>No tienes recursos favoritos</Text>
        ))}

      {error && user && !isLoading && <p>Algo ha ido mal...</p>}

      <Modal
        isOpen={isLoginOpen || isRegisterOpen}
        toggleModal={() =>
          isLoginOpen ? setIsLoginOpen(false) : setIsRegisterOpen(false)
        }
      >
        {isLoginOpen && (
          <Login
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
        {isRegisterOpen && (
          <Register
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
      </Modal>
    </>
  )
}
