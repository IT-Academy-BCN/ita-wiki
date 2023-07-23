import { useQuery } from '@tanstack/react-query'
import { urls } from '../constants'

export type TFavorites = {
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

const getFavorites = async (): Promise<TFavorites[] | Error> => {
  try {
    const response: Response = await fetch(urls.getFavorites)

      if (!response.ok) {
        throw new Error("Error fetching favorite resources")
      }
      const data: TFavorites[] = await response.json()
      return data
  }
  catch (error) {
    throw new Error("Error fetching favorite resources")
  }
}

export const useGetFavorites = () => {

  const data = useQuery<TFavorites[] | Error> ({
    queryKey: ["userFavorites"],
    queryFn: getFavorites
  })
  
  return data
}