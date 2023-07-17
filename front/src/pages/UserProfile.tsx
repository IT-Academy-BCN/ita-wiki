import { FC } from 'react'
import {useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { CardProfile } from '../components/molecules/CardProfile'
import icons from '../assets/icons'
import {urls, paths} from '../constants'
import { Spinner } from '../components/atoms'

interface UserData {
  name: string
  dni: string
  email: string
  status: string
  role: string
}

const UserProfile: FC = () => {
  // const [ favorites, setFavorites ] = useState(null)
  const navigate = useNavigate()

  const getUser = async () => fetch(urls.getMe)
      .then((res) => res.json())

  const {
    error,
    data,
    status
  } = useQuery<UserData>({
    queryKey: ["currentUser"],
    queryFn: getUser
  })

  if(status === 'loading') {
    return <Spinner />
  }

  if(status === 'error') {
    navigate(paths.home)
    throw new Error(`Error fetching user info ${error}`)
  }

  const handleLogOut = async (): Promise<void> => {
    await fetch(urls.logOut)
    navigate(paths.home)
    window.location.reload()
  }

  return (
    <CardProfile
      img={ icons.profileImg } 
      userName={ data.name ? data.name : '@userName' }
      email={ data.email ? data.email : 'ona_costa@gmail.com' }
      contributions={ 5 } 
      votes={ 54 }
      favorites={ 73 }
      handleLogOut={ handleLogOut }
    />
  )

}

export { UserProfile }

