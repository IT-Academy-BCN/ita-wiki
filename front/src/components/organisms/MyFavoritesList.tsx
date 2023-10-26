import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useGetFavorites } from '../../hooks/useGetFavorites'
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
import Login from './Login'
import Register from './Register'
import { TFavorites } from '../../types'

const TitleContainer = styled(FlexBox)`
  align-items: stretch;

  @media only ${device.Tablet} {
    flex-direction: row;
    align-items: center;
    gap: ${dimensions.spacing.xxxs};
    margin-top: ${dimensions.spacing.md};
  }
`

const FavoritesContainer = styled(FlexBox)`
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

const FavoritesCardList = styled(FlexBox)`
  margin-right: ${dimensions.spacing.xxs};

  @media only ${device.Tablet} {
    margin-right: ${dimensions.spacing.none};
  }
`

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

export const MyFavoritesList: FC = () => {
  const { user } = useAuth()
  const { slug } = useParams()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(getWindowIsMobile())
  const { t } = useTranslation()
  const { isLoading, isError, data } = useGetFavorites(slug)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getWindowIsMobile())
    }
    window.addEventListener('resize', handleResize)
  }, [isMobile])

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
            {t('Recursos que te gustan')}
          </Title>
        ) : (
          <>
            <Icon name="favorite" fill={0} />
            <Title as="h2" fontWeight="bold">
              {t('Recursos favoritos')}
            </Title>
          </>
        )}
      </TitleContainer>
      {!user && (
        <StyledText data-testid="no-user">
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

      {data &&
        (data?.length > 0 ? (
          <FavoritesContainer>
            {data?.map((fav: TFavorites) => (
              <FavoritesCardList key={fav.id}>
                <ResourceTitleLink
                  url={fav.url}
                  title={fav.title}
                  description={fav.description}
                />
              </FavoritesCardList>
            ))}
          </FavoritesContainer>
        ) : (
          <StyledText>{t('No tienes recursos favoritos')}</StyledText>
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
