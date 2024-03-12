import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BackButton,
  CardProfile,
  FlexBox,
  colors,
  dimensions,
  device,
  responsiveSizes,
} from '@itacademy/ui'
import { paths } from '../constants'
import { logOut } from '../utils/logOut'
import { useGetFavorites } from '../hooks/useGetFavorites'
import { useGetResourcesByUser } from '../hooks/useGetResourcesByUser'
import { useAuth } from '../context/AuthProvider'
import { TResource } from '../types'
import { Navbar, UserProfileResourcesWidget } from '../components/organisms'

const Container = styled(FlexBox)`
  width: 100%;
  overflow-x: hidden;
  background-color: ${colors.gray.gray5};
  padding-bottom: ${dimensions.spacing.xl};

  @media only ${device.Tablet} {
    height: 100vh;
    padding: ${dimensions.spacing.none} ${dimensions.spacing.md}
      ${dimensions.spacing.xl} ${dimensions.spacing.md};
  }
`

const NavContainer = styled(FlexBox)`
  width: 100%;
`

const ResourcesLists = styled(FlexBox)`
  margin-top: ${dimensions.spacing.base};

  @media only ${device.Tablet} {
    flex-direction: row;
    width: 96%;
  }

  @media only ${device.Laptop} {
    width: 90%;
    margin-top: ${dimensions.spacing.xl};
    gap: ${dimensions.spacing.xl};
  }

  @media only ${device.Desktop} {
    width: 86%;
  }
`

const getWindowMobile = () =>
  window.innerWidth <= parseInt(responsiveSizes.tablet, 10)

export const UserProfile: FC = () => {
  const {
    data: favoritesData,
    isLoading: favsLoading,
    isError: favsError,
  } = useGetFavorites()

  const favoritesLength = favoritesData?.length

  const {
    data: resourcesData,
    isLoading: resourcesLoading,
    isError: resourcesError,
  } = useGetResourcesByUser()

  const resourcesLength = resourcesData?.length
  const { user } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [votes, setVotes] = useState<number | undefined>()

  useEffect(() => {
    if (resourcesData) {
      const newVotes = resourcesData
        .map(({ voteCount }: TResource) => voteCount.total)
        .reduce((a: number, b: number) => a + b, 0)
      setVotes(newVotes)
    }
  }, [resourcesData])

  const [isMobile, setIsMobile] = useState(getWindowMobile())

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(getWindowMobile())
    }
    window.addEventListener('resize', handleSize)
  }, [isMobile])

  const handlePrevPage = () => {
    navigate(-1)
  }

  const userData = {
    profilePicture: user?.avatarId,
    profilePictureAlt: user?.avatarId ? user.name : t('Sin imagen de usuario'),
    userName: user?.name || '@userName',
    userEmail: user?.email || 'user@user.com',
  }

  const counterData = [
    {
      number: resourcesLength,
      text: `${t('Aportaciones')}`,
      icon: 'attach_file',
      isError: resourcesError,
      errorMessage: `${t('n/d')}`,
    },
    {
      number: votes,
      text: `${t('Votos recibidos')}`,
      icon: 'expand_less',
      isError: resourcesError,
      errorMessage: `${t('n/d')}`,
    },
    {
      number: favoritesLength,
      text: `${t('Favoritos guardados')}`,
      icon: 'favorite',
      isError: favsError,
      errorMessage: `${t('n/d')}`,
    },
  ]

  const logoutData = {
    logoutIcon: {
      name: 'power_settings_new',
    },
    handleLogOut: () => logOut(navigate, paths.home),
    logoutMsg: t('Cerrar sesión'),
  }

  return (
    <Container direction="column" justify="flex-start">
      <NavContainer direction="row">
        <BackButton onClick={handlePrevPage}>{t('Volver')}</BackButton>
        {!isMobile ? <Navbar /> : null}
      </NavContainer>
      <CardProfile
        userData={userData}
        counterData={counterData}
        logoutData={logoutData}
      />
      <ResourcesLists
        justify="flex-start"
        align="start"
        gap={`${dimensions.spacing.base}`}
        direction="column-reverse"
      >
        <UserProfileResourcesWidget
          title={t('Mis recursos')}
          titleMobile={t('Tus recursos')}
          resourcesArray={resourcesData ?? []}
          isLoading={resourcesLoading}
          isError={resourcesError}
        />
        <UserProfileResourcesWidget
          title={t('Recursos favoritos')}
          titleMobile={t('Recursos que te gustan')}
          resourcesArray={favoritesData ?? undefined}
          isLoading={favsLoading}
          isError={favsError}
        />
      </ResourcesLists>
    </Container>
  )
}
