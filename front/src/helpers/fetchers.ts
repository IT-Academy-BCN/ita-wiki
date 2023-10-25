import { urls } from '../constants'

export type TTopic = {
  id?: string
  name: string
  slug?: string
  categoryId?: string
}

export type TGetTopics = {
  id: string
  name: string
  slug: string
  categoryId: string
}[]

export type TGetTypes = string[]

export type TFavorites = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  userId?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  voteCount: {
    upvote: number
    downvote: number
    total: number
    userVote: number
  }
  isFavorite: boolean
}

export type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  userId?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  voteCount: {
    upvote: number
    downvote: number
    total: number
    userVote: number
  }
  isFavorite: boolean
}

const errorMessageStatus: { [key: number]: string } = {
  401: 'Error 401 - No autorizado',
  403: 'Error 403 - Acceso denegado',
  404: 'Error 404 - No se puede guardar',
  405: 'Error 405 - Id de usuario inválido',
  500: 'Error 500 - Error bbdd',
}

export const getTopics = async (slug: string): Promise<TGetTopics> =>
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

export const createTopicFetcher = (createdTopic: TTopic) =>
  fetch(urls.postTopics, {
    method: 'POST',
    body: JSON.stringify(createdTopic),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(errorMessageStatus[res.status])
    }
    return res.status === 204 ? {} : res.json()
  })

export const updateTopicFetcher = (updatedTopic: TTopic) =>
  fetch(urls.patchTopics, {
    method: 'PATCH',
    body: JSON.stringify(updatedTopic),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(errorMessageStatus[res.status])
    }
    return res.status === 204 ? null : res.json()
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

export const getFavorites = async (slug?: string): Promise<TFavorites[]> => {
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
