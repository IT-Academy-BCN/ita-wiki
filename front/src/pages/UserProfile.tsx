import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardProfile } from '../components/molecules/CardProfile'
import icons from '../assets/icons'
import { paths } from '../constants'
import { logOut } from '../utils/logOut'
import {useGetFavorites, TFavorites} from '../hooks/useGetFavorites';
import { useGetMyResources } from '../hooks/useGetMyResources'
import { useAuth } from '../context/AuthProvider'
import { BackButton } from '../components/atoms/BackButton'

export const UserProfile: FC = () => {
  const favorites = useGetFavorites()
  const favoritesData = favorites.data as TFavorites[] | undefined;
  const favoritesLength = favoritesData?.length ?? 0;
  const { resources } = useGetMyResources()
  const { user } = useAuth()
  const navigate = useNavigate()

  type UserWithEmail = {
    name: string
    avatar: string
    email: string
  }

  const userWithEmail = user as UserWithEmail

  type Resource = {
    voteCount : {
      total: number
    }
  }

  const totalVotes: number = resources && resources.length > 0 ? resources.map(({ voteCount }: Resource) => voteCount.total).reduce((a: number,b: number) => a + b) : 0

  return (
    <>
      <BackButton />
      <CardProfile
        img={ icons.user } 
        userName={ userWithEmail?.name ?? '@userName' }
        email={ userWithEmail?.email ?? 'user@user.com' }
        contributions={ resources?.length ?? 0 } 
        votes={ totalVotes }
        favorites={ favoritesLength }
        handleLogOut={ () => logOut(navigate, paths.home) }
      />
    </>
  )
}


