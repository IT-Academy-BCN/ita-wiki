import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CardProfile } from '../components/molecules/CardProfile'
import { paths } from '../constants'
import { logOut } from '../utils/logOut'
import { useGetFavorites } from '../hooks/useGetFavorites'
import { useGetResourcesByUser } from '../hooks/useGetResourcesByUser'
import { useAuth } from '../context/AuthProvider'
import { BackButton } from '../components/atoms/BackButton'
import { TResource } from '../types'
import { FlexBox, colors, dimensions, device, responsiveSizes } from '../styles'
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
  justify-content: flex-start;
  align-items: flex-start;

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
        .reduce((a: number, b: number) => a + b)
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

  return (
    <Container direction="column" justify="flex-start">
      <NavContainer direction="row">
        <BackButton />
        {!isMobile ? <Navbar /> : null}
      </NavContainer>
      <CardProfile
        img={user?.avatarId ?? ''}
        userName={user?.name ?? '@userName'}
        email={user?.email ?? 'user@user.com'}
        votes={votes}
        contributions={resourcesLength}
        favorites={favoritesLength}
        handleLogOut={() => logOut(navigate, paths.home)}
        resourcesError={resourcesError}
        favsError={favsError}
      />
      <ResourcesLists
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
