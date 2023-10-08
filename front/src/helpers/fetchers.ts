import { urls } from '../constants'

type TTopicReturned = {
  id: string
  name: string
  slug: string
  categoryId: string
}

export type TGetTopics = TTopicReturned[]
export type TGetTypes = string[]

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
  status: 'NOT_SEEN' | 'SEEN'
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
}

export const getTopics = async (slug?: string): Promise<TGetTopics> =>
  fetch(`${urls.getTopics}?slug=${slug}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching topics: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching topics: ${err.message}`)
    })

export const getCategories = async () =>
  fetch(urls.getCategories)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching categories: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching categories: ${err.message}`)
    })

export const getTypes = (): Promise<TGetTypes> =>
  fetch(urls.getTypes, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching types: ${res.statusText}`)
      }
      return res.json() as Promise<TGetTypes>
    })
    .catch((err) => {
      throw new Error(`Error fetching types: ${err.message}`)
    })

export const getFavorites = async (
  slug?: string
): Promise<TFavorites[] | Error> => {
  const urlFavorites = slug
    ? `${urls.getFavorites}/${slug}`
    : `${urls.getFavorites}`

  try {
    const response: Response = await fetch(urlFavorites)

    if (!response.ok) {
      throw new Error('Error fetching favorite resources')
    }
    const data: TFavorites[] = await response.json()

    return data
  } catch (error) {
    throw new Error('Error fetching favorite resources')
  }
}

export const favMutation = async (id: string) => {
  const response = await fetch(urls.favorites, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  if (!response.ok) {
    throw new Error(`Error updating favorite resource: ${response.statusText}`)
  }
}
