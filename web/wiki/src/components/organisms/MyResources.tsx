import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FlexBox,
  Modal,
  Spinner,
  Text,
  Title,
  colors,
  device,
  dimensions,
  font,
  responsiveSizes,
} from '@itacademy/ui'
import { useAuth } from '../../context/AuthProvider'
import { CardResourceLink } from './CardResourceLink'
import { Login } from './Login'
import { Register } from './Register'
import { TResource } from '../../types'
import { useListUserMeResources } from '../../openapi/openapiComponents'

const TitleContainer = styled(FlexBox)`
  @media only ${device.Tablet} {
    margin-top: ${dimensions.spacing.md};
    margin-bottom: ${dimensions.spacing.xxxs};
  }
`

const ResourcesUserStyled = styled(FlexBox)`
  overflow: hidden;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only ${device.Tablet} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
    overflow-y: auto;
    gap: 0.35rem;
  }
`

const MyResourcesCardList = styled(FlexBox)`
  width: 100%;

  @media only ${device.Tablet} {
    padding-bottom: 0.3rem;
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

const getWindowMobile = () =>
  window.innerWidth <= parseInt(responsiveSizes.tablet, 10)

export const MyResources = () => {
  const { user } = useAuth()
  const { slug } = useParams()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(getWindowMobile())
  const { t } = useTranslation()
  const { data, isLoading, isError } = useListUserMeResources(
    { queryParams: { categorySlug: slug } },
    { enabled: !!user }
  )

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(getWindowMobile())
    }
    window.addEventListener('resize', handleSize)
  }, [isMobile])

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }
  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <>
      <TitleContainer data-testid="main-title" align="stretch">
        {isMobile ? (
          <Title as="h3" fontWeight="bold">
            {t('Tus recursos')}
          </Title>
        ) : (
          <Title as="h2" fontWeight="bold" data-testid="title">
            {t('Mis recursos')}
          </Title>
        )}
      </TitleContainer>
      {!user && (
        <StyledText color={colors.gray.gray3} data-testid="no-user">
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

      {isLoading && user && <Spinner size="medium" role="status" />}

      {data?.resources &&
        (data.resources.length > 0 ? (
          <ResourcesUserStyled direction="row">
            {data.resources.map((resource: TResource) => (
              <MyResourcesCardList key={resource.id}>
                <CardResourceLink
                  createdBy={resource?.user.id ?? ''}
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
                  editable
                  isFavorite={false}
                />
              </MyResourcesCardList>
            ))}
          </ResourcesUserStyled>
        ) : (
          <Text color={colors.gray.gray4}>
            {t('No has subido ningún recurso')}
          </Text>
        ))}

      {isError && user && !isLoading ? <p>{t('Algo ha ido mal...')}</p> : null}

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
