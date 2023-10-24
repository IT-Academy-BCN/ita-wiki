import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardProfile } from '../components/molecules/CardProfile'
import icons from '../assets/icons'
import { paths } from '../constants'
import { logOut } from '../utils/logOut'
import { useGetFavorites } from '../hooks/useGetFavorites'
import { useGetResourcesByUser } from '../hooks/useGetResourcesByUser'
import { useAuth } from '../context/AuthProvider'
import { BackButton } from '../components/atoms/BackButton'
import { TResource } from '../types'

export const UserProfile: FC = () => {
  const { data: favoritesData } = useGetFavorites()
  const favoritesLength = favoritesData?.length ?? 0
  const resources = useGetResourcesByUser()
  const resourcesData = resources.data as TResource[] | undefined
  const resourcesLength = resourcesData?.length ?? 0
  const { user } = useAuth()
  const navigate = useNavigate()

  const totalVotes: number =
    resourcesData && resourcesLength > 0
      ? resourcesData
          .map(({ voteCount }: TResource) => voteCount.total)
          .reduce((a: number, b: number) => a + b)
      : 0

  return (
    <>
      <BackButton />
      <CardProfile
        img={icons.user}
        userName={user?.name ?? '@userName'}
        email={user?.email ?? 'user@user.com'}
        contributions={resourcesLength}
        votes={totalVotes}
        favorites={favoritesLength}
        handleLogOut={() => logOut(navigate, paths.home)}
      />
    </>
  )
}
