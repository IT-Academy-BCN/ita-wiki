import { useQuery } from '@tanstack/react-query'
import { urls } from '../constants'

export type TResources = {
  id: string
  title: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  topics: {
    topic: {
      id: string
      name: string
      slug: string
      categoryId: string
    }
  }[]
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
}

const getResources = async (): Promise<TResources[] | Error> => {
  try {
    const response: Response = await fetch(urls.getResourcesByUser)

      if (!response.ok) {
        throw new Error("Error fetching user's resources")
      }
      const data: { resources: TResources[] } = await response.json()
      return data.resources
  }
  catch (error) {
    throw new Error("Error fetching user's resources")
  }
}

export const useGetResources = () => {

  const data = useQuery<TResources[] | Error> ({
    queryKey: ["userResources"],
    queryFn: getResources
  })

  return data
}