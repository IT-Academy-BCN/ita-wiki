import { useQuery } from '@tanstack/react-query'
import { urls } from '../constants'
import { Spinner } from '../components/atoms'

export const useGetFavorites = () => {
  type TFavorites = {
    id: string
    title: string
    slug: string
    description: string
    url: string
    resourceType: string
    userId: string
    createdAt: string
    updatedAt: string
  }
  
  const getFavorites = async () =>
    fetch(urls.getFavorites)
      .then((res) => res.json())
  
    const {
      error,
      data,
      status
    } = useQuery({
      queryKey: ["userFavorites"],
      queryFn: getFavorites
    })
  
    if(status === 'loading') {
      return <Spinner />
    }
  
    if(status === 'error') {
      throw new Error(`Error fetching user's favorites' ${error}`)
    }

    return data
}