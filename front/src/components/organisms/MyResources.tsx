import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthProvider'
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
import { TResource } from '../../types'
import { useGetResourcesByUser } from '../../hooks'

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

const MyResources = () => {
  const { user } = useAuth()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(getWindowMobile())
  const { t } = useTranslation()

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(getWindowMobile())
    }
    window.addEventListener('resize', handleSize)
  }, [isMobile])

  const params = useParams<{ slug: string }>()
  const categorySlug: string | undefined = params.slug
  const { data, isLoading, error } = useGetResourcesByUser(categorySlug)
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
            {t('Tus recursos')}
          </Title>
        ) : (
          <>
            <Icon name="menu_book" fill={0} />
            <Title as="h2" fontWeight="bold" data-testid="title">
              {t('Mis recursos')}
            </Title>
          </>
        )}
      </TitleContainer>
      {!user && (
        <StyledText color={colors.gray.gray3}>
          <TextDecorationStyled onClick={handleRegisterModal}>
            {t('Regístrate')}
          </TextDecorationStyled>
          {t(' o ')}
          <TextDecorationStyled onClick={handleLoginModal}>
            {t('inicia sesión')}
          </TextDecorationStyled>
          {t(' para añadir recursos favoritos')}
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
                    isFavorite={false}
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
                    isFavorite={false}
                  />
                )}
              </MyResourcesCardList>
            ))}
          </ResourcesUserStyled>
        ) : (
          <Text color={colors.gray.gray4}>
            {t('No has subido ningún recurso')}
          </Text>
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
