import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { urls } from '../../constants'
import { Icon, Title, Spinner, Text } from '../atoms'
import { useAuth } from '../../context/AuthProvider'
import {
  FlexBox,
  colors,
  device,
  dimensions,
  font,
  responsiveSizes,
} from '../../styles'
import { Modal, ResourceTitleLink } from '../molecules'
import CardResource from './CardResource'
import Login from './Login'
import Register from './Register'

const TitleContainer = styled(FlexBox)`
  align-items: stretch;

  @media only ${device.Tablet} {
    flex-direction: row;
    align-items: center;
    gap: ${dimensions.spacing.xxxs};
    margin-top: ${dimensions.spacing.xl};
  }
`

const FavoritesContainer = styled(FlexBox)`
  flex-direction: row;
  overflow: hidden;
  overflow-x: auto;
  justify-content: flex-start;
  margin-bottom: ${dimensions.spacing.base};

  &::-webkit-scrollbar {
    display: none;
  }

  @media only ${device.Tablet} {
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    overflow-y: auto;
  }
`

const FavoritesCardList = styled(FlexBox)`
  margin-right: ${dimensions.spacing.xxs};

  @media only ${device.Tablet} {
    margin-right: ${dimensions.spacing.none};
  }
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

type TGetFavorites = TFavorites[]

const StyledText = styled(Text)`
  color: ${colors.gray.gray3};
  font-weight: ${font.regular};

  @media only ${device.Tablet} {
    color: ${colors.gray.gray4};
  }
`

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const getWindowIsMobile = () =>
  window.innerWidth <= parseInt(responsiveSizes.tablet, 10)

const getFavorites = async (slug?: string) =>
  fetch(`${urls.getFavorites}?categorySlug=${slug}`)
    //fetch(`${urls.getFavorites}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching favorite resources: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching favorite resources: ${err.message}`)
    })

export const MyFavoritesList: FC = () => {
  const { user } = useAuth()
  const { slug } = useParams()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(getWindowIsMobile())

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getWindowIsMobile())
    }
    window.addEventListener('resize', handleResize)
  }, [isMobile])

  const { isLoading, data, error } = useQuery<TGetFavorites>({
    queryKey: ['getFavorites', slug],
    queryFn: () => getFavorites(slug),
    enabled: !!user, // Enable the query only if there is a logged-in user
  })

  //AMS SLUG
  // const { isLoading, data, error } = useQuery<TGetFavorites>({
  //   queryKey: ['getFavorites', slug],
  //   queryFn: () => getFavorites(slug),
  //   enabled: !!user, // Enable the query only if there is a logged-in user
  // })

  console.log('FAVS', data)

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <>
      <TitleContainer data-testid="title">
        {isMobile ? (
          <Title as="h3" fontWeight="bold">
            Recursos que te gustan
          </Title>
        ) : (
          <>
            <Icon name="favorite" fill={0} />
            <Title as="h2" fontWeight="bold">
              Recursos favoritos
            </Title>
          </>
        )}
      </TitleContainer>
      {!user && (
        <StyledText data-testid="no-user">
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

      {isLoading && user && <Spinner size="medium" role="status" />}

      {!isLoading &&
        !error &&
        (data && data.length > 0 ? (
          <FavoritesContainer>
            {data.map((fav: TFavorites) => (
              <FavoritesCardList key={fav.id}>
                {isMobile ? (
                  <CardResource
                    createdBy={fav.userId}
                    createdAt={fav.createdAt}
                    updatedAt={fav.updatedAt}
                    description={fav.description}
                    img=""
                    id={fav.id}
                    title={fav.title}
                    url={fav.url}
                    handleAccessModal={() => {}}
                    resourceType=""
                    topics={[]}
                    editable={false}
                  />
                ) : (
                  <ResourceTitleLink
                    url={fav.url}
                    title={fav.title}
                    description={fav.description}
                  />
                )}
              </FavoritesCardList>
            ))}
          </FavoritesContainer>
        ) : (
          <StyledText data-testid="no-favs">
            No tienes recursos favoritos
          </StyledText>
        ))}

      {error && user && !isLoading ? <p>Algo ha ido mal...</p> : null}

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
