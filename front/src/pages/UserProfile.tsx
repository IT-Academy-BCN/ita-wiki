import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardProfile } from '../components/molecules/CardProfile'
import icons from '../assets/icons'
import { paths } from '../constants'
import { logOut } from '../utils/logOut'
import { useGetFavorites, TFavorites } from '../hooks/useGetFavorites'
import { useGetResources, TResources } from '../hooks/useGetResources'
import { useAuth } from '../context/AuthProvider'
import { BackButton } from '../components/atoms/BackButton'

export const UserProfile: FC = () => {
  const favorites = useGetFavorites()
  const favoritesData = favorites.data as TFavorites[] | undefined
  const favoritesLength = favoritesData?.length ?? 0
  const resources = useGetResources()
  const resourcesData = resources.data as TResources[] | undefined
  const resourcesLength = resourcesData?.length ?? 0
  const { user } = useAuth()
  const navigate = useNavigate()

  type UserWithEmail = {
    name: string
    avatar: string
    email: string
  }

  const userWithEmail = user as UserWithEmail

  type Resource = {
    voteCount: {
      total: number
    }
  }

  const totalVotes: number =
    resourcesData && resourcesLength > 0
      ? resourcesData
          .map(({ voteCount }: Resource) => voteCount.total)
          .reduce((a: number, b: number) => a + b)
      : 0

  return (
    <>
      <BackButton />
      <CardProfile
        img={icons.user}
        userName={userWithEmail?.name ?? '@userName'}
        email={userWithEmail?.email ?? 'user@user.com'}
        contributions={resourcesLength}
        votes={totalVotes}
        favorites={favoritesLength}
        handleLogOut={() => logOut(navigate, paths.home)}
      />
    </>
  )
}
