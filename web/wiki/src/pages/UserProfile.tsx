import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
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
import { useAuth } from '../context/AuthProvider'
import { TResource } from '../types'
import { Navbar, UserProfileResourcesWidget } from '../components/organisms'
import {
  useListFavoritesResources,
  useListUserMeResources,
} from '../openapi/openapiComponents'

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
  const { user } = useAuth()
  const { slug } = useParams()
  const {
    data: favoritesData,
    isLoading: favsLoading,
    isError: favsError,
  } = useListFavoritesResources(
    { queryParams: { categorySlug: slug ?? '' } },
    { enabled: !!user }
  )

  const favoritesLength = favoritesData ? favoritesData.length : 0

  const {
    data: resourcesData,
    isLoading: resourcesLoading,
    isError: resourcesError,
  } = useListUserMeResources(
    { queryParams: { categorySlug: slug ?? undefined } },
    { enabled: !!user }
  )

  console.log('resourcesData', resourcesData)

  const resourcesLength = resourcesData?.resources
    ? resourcesData.resources.length
    : 0

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [votes, setVotes] = useState<number | undefined>()

  useEffect(() => {
    if (resourcesData?.resources) {
      const newVotes = resourcesData.resources
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
    profilePicture: undefined,
    profilePictureAlt: t('Sin imagen de usuario'),
    userName: user?.name || '@userName',
    userEmail: user?.email || 'user@user.com',
  }

  const counterData = [
    {
      number: resourcesLoading ? undefined : resourcesLength,
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
      number: favsLoading ? undefined : favoritesLength,
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
          resourcesArray={resourcesData ?? undefined}
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
