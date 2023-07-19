import { useQuery } from '@tanstack/react-query'
import { urls } from '../constants'
import { Spinner } from '../components/atoms'

export const useGetMyResources = () => {

  const getMyResources = async () =>
    fetch(urls.getResourcesByUser)
      .then((res) => res.json())
  
    const {
      error,
      data,
      status
    } = useQuery({
      queryKey: ["userResources"],
      queryFn: getMyResources
    })
  
    if(status === 'loading') {
      return <Spinner />
    }
  
    if(status === 'error') {
      throw new Error(`Error fetching user's favorites' ${error}`)
    }

    return data
}
