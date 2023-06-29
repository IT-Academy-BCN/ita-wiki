import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthProvider'
import { urls } from '../../constants'
import { Modal, ResourceTitleLink } from '../molecules'
import { Title, Spinner, Icon, Text } from '../atoms'
import { FlexBox, colors, dimensions, font } from '../../styles'
import Login from './Login'
import Register from './Register'

type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  topics: {
    topic: {
      id: string
      name: string
      slug: string
      categoryId: string
      createdAt: string
      updatedAt: string
    }
  }[]
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
}

const TitleContainer = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.xl};
`

const ResourcesUserStyled = styled(FlexBox)`
  align-items: flex-start;
  margin-bottom: ${dimensions.spacing.md};
`

const StyledText = styled(Text)`
  font-weight: ${font.regular};
  line-height: 1.3;
`

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const getResourcesByUser = async (categorySlug: string | undefined) => {
  const response = await fetch(
    `${urls.getResourcesByUser}?category=${categorySlug}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Error fetching resources: ${response.statusText}`)
  }

  const data = await response.json()
  return data.resources
}

const MyResources = () => {
  const { user } = useAuth()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const params = useParams<{ slug: string }>()
  const categorySlug: string | undefined = params.slug

  const { isLoading, data, error } = useQuery({
    queryKey: ['getResourcesByUser', categorySlug],
    queryFn: () => getResourcesByUser(categorySlug),
    enabled: !!user, // Enable the query only if there is a logged-in user
  })

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <>
      <TitleContainer>
        <Icon name="menu_book" fill={0} />
        <Title as="h2" fontWeight="bold" data-testid="title">
          Mis recursos
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

      {isLoading && user && <Spinner />}

      {!isLoading &&
        !error &&
        (data && data.length > 0 ? (
          data.map((resource: TResource) => (
            <ResourcesUserStyled key={resource.id}>
              <ResourceTitleLink
                url={resource.url}
                title={resource.title}
                description={resource.description}
              />
            </ResourcesUserStyled>
          ))
        ) : (
          <Text color={colors.gray.gray4}>No has subido ningún recurso</Text>
        ))}

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

export { MyResources }
