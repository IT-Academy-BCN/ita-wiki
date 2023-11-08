import { urls } from '../constants'
import {
  TTopic,
  TGetTopics,
  TGetTypes,
  TFavorites,
  TResource,
  TVoteCount,
  TVoteMutationData,
  TForm,
} from '../types'

const errorMessageStatus: { [key: number]: string } = {
  401: 'Error 401 - No autorizado',
  403: 'Error 403 - Acceso denegado',
  404: 'Error 404 - No se puede guardar',
  405: 'Error 405 - Id de usuario inválido',
  500: 'Error 500 - Error bbdd',
}

export const getTopics = async (slug?: string): Promise<TGetTopics> => {
  const url = slug ? `${urls.getTopics}?slug=${slug}` : urls.getTopics

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Error fetching topics: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

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

export const getUsers = async () => {
  const response = await fetch(urls.users)
  const data = await response.json()
  return data
}

export const getResources = async (filters: string) =>
  fetch(`${urls.getResources}?${filters}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching resources: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching resources: ${err.message}`)
    })

export const getResourcesByUser = async (categorySlug: string | undefined) => {
  const response = await fetch(
    `${urls.getResourcesByUser}?category=${categorySlug}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Error fetching resources: ${response.statusText}`)
  }

  const data = await response.json()

  return data.resources.map((resource: TResource) => ({
    ...resource,
    editable: true,
  }))
}

export const getVotes = async (resourceId: string): Promise<TVoteCount> => {
  const response = await fetch(`${urls.vote}${resourceId}`)
  if (!response.ok) {
    throw new Error('Error fetching votes')
  }
  const data = await (response.json() as Promise<TVoteCount>)
  return data
}

export const updateVote = async ({ resourceId, vote }: TVoteMutationData) => {
  const response = await fetch(urls.vote, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resourceId, vote }),
  })

  if (!response.ok) {
    throw new Error('Error fetching votes')
  }
}

export const loginUserFetcher = async (user: object) => {
  const errorMessage: { [key: number]: string } = {
    403: 'Usuario en proceso de activación. Por favor, póngase en contacto con el administrador.',
    404: 'Acceso restringido. Por favor, contacte con el personal de IT Academy.',
    422: 'Identificador o contraseña incorrectos.',
  }

  const response = await fetch(urls.logIn, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  })

  if (
    !response.ok &&
    Object.hasOwnProperty.call(errorMessage, response.status)
  ) {
    throw new Error(errorMessage[response.status])
  }

  return response.status === 204 ? null : response.json()
}
export const registerUserFetcher = async (useData: TForm) => {
  const response = await fetch(urls.register, {
    method: 'POST',
    body: JSON.stringify(useData),
    headers: { 'Content-type': 'application/json' },
  })
  if (!response.ok)
  throw new Error(`Error al registrar usuario: ${response.statusText}`)

  return response.status === 204 ? null : response.json()
}

export const createResourceFetcher = (resource: object) =>
  fetch(urls.createResource, {
    method: 'POST',
    body: JSON.stringify(resource),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al crear el recurso')
      }
      return res.status === 204 ? {} : res.json()
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error))

export const updateResourceFetcher = (resource: object) =>
  fetch(urls.updateResource, {
    method: 'PATCH',
    body: JSON.stringify(resource),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al actualizar el recurso')
      }
      return res.status === 204 ? {} : res.json()
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error))

export const updateStatus = async (id: string) => {
  const response = await fetch(`${urls.postStatus}/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })

  if (!response.ok) {
    throw new Error('Error updating status')
  }
}
