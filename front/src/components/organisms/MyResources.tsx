import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthProvider'
import { urls } from '../../constants'
import { Modal } from '../molecules'
import CardResource from './CardResource'
import { Title, Spinner, Icon, Text } from '../atoms'
import {
  FlexBox,
  colors,
  device,
  dimensions,
  font,
  responsiveSizes,
} from '../../styles'
import { CardResourceLink } from './CardResourceLink'
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
  editable: boolean
}

const TitleContainer = styled(FlexBox)`
  align-items: stretch;

  @media only ${device.Tablet} {
    flex-direction: row;
    align-items: center;
    gap: ${dimensions.spacing.xxxs};
    margin-top: ${dimensions.spacing.md};
  }
`

const ResourcesUserStyled = styled(FlexBox)`
  flex-direction: row;
  overflow: hidden;
  overflow-x: auto;
  justify-content: flex-start;

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

const StyledText = styled(Text)`
  font-weight: ${font.regular};
  line-height: 1.3;

  @media only ${device.Tablet} {
    color: ${colors.gray.gray4};
  }
`
const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const MyResourcesCardList = styled(FlexBox)`
  margin-right: ${dimensions.spacing.xxs};

  @media only ${device.Tablet} {
    margin-right: ${dimensions.spacing.none};
  }
`

const getWindowMobile = () =>
  window.innerWidth <= parseInt(responsiveSizes.tablet, 10)

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

  return data.resources.map((resource: TResource) => ({
    ...resource,
    editable: true,
  }))
}

const MyResources = () => {
  const { user } = useAuth()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(getWindowMobile())

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(getWindowMobile())
    }
    window.addEventListener('resize', handleSize)
  }, [isMobile])

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
      <TitleContainer data-testid="main-title">
        {isMobile ? (
          <Title as="h3" fontWeight="bold">
            Tus recursos
          </Title>
        ) : (
          <>
            <Icon name="menu_book" fill={0} />
            <Title as="h2" fontWeight="bold" data-testid="title">
              Mis recursos
            </Title>
          </>
        )}
      </TitleContainer>
      {!user && (
        <StyledText color={colors.gray.gray3}>
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

      {isLoading && user && <Spinner size="medium" />}

      {!isLoading &&
        !error &&
        (data && data.length > 0 ? (
          <ResourcesUserStyled>
            {data.map((resource: TResource) => (
              <MyResourcesCardList key={resource.id}>
                {isMobile ? (
                  <CardResource
                    createdBy={resource.user.name}
                    createdAt={resource.createdAt}
                    updatedAt={resource.updatedAt}
                    description={resource.description}
                    img=""
                    id={resource.id}
                    title={resource.title}
                    url={resource.url}
                    handleAccessModal={() => {}}
                    resourceType=""
                    topics={[]}
                    editable={resource.editable}
                  />
                ) : (
                  <CardResourceLink
                    createdBy={resource.user.name}
                    createdAt={resource.createdAt}
                    updatedAt={resource.updatedAt}
                    description={resource.description}
                    img=""
                    id={resource.id}
                    title={resource.title}
                    url={resource.url}
                    handleAccessModal={() => {}}
                    resourceType={resource.resourceType}
                    topics={resource.topics}
                    editable={resource.editable}
                  />
                )}
              </MyResourcesCardList>
            ))}
          </ResourcesUserStyled>
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
