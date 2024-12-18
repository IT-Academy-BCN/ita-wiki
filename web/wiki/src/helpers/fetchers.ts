import { urls } from '../constants'
import {
  TTopic,
  TGetTopics,
  TGetTypes,
  TFavorites,
  TResource,
  TVoteCount,
  TVoteMutationData,
  TRegisterForm,
  TUserUpdatedStatus,
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
      if (Object.hasOwnProperty.call(errorMessageStatus, res.status)) {
        throw new Error(errorMessageStatus[res.status])
      } else {
        throw new Error('Error inesperado')
      }
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
      if (Object.hasOwnProperty.call(errorMessageStatus, res.status)) {
        throw new Error(errorMessageStatus[res.status])
      } else {
        throw new Error('Error inesperado')
      }
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

export const getItineraries = async () =>
  fetch(urls.getItineraries)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching itineraries: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching itineraries: ${err.message}`)
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
  if (!response.ok) {
    throw new Error(`Error fetching users`)
  }
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

export const getResourcesByUser = async (slug: string | undefined) => {
  const urlResourcesByUser = slug
    ? `${urls.getResourcesByUser}?categorySlug=${slug}`
    : `${urls.getResourcesByUser}`

  const response = await fetch(urlResourcesByUser, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching resources: ${response.statusText}`)
  }

  const data = await response.json()

  return data.map((resource: TResource) => ({
    ...resource,
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
    400: 'Error 400 - Error de validación ZOD',
    401: 'Error 401 - Credenciales incorrectas',
    403: 'Error 403 - Acceso denegado (usuario no activo)',
    404: 'Error 404 - Usuario no encontrado.',
    422: 'Error 422 - Contraseña incorrecta.',
    500: 'Error 500 - Error bbdd',
    503: 'Error 503 - "Servicio no disponible',
  }

  const response = await fetch(urls.logIn, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    if (Object.hasOwnProperty.call(errorMessage, response.status)) {
      throw new Error(errorMessage[response.status])
    } else {
      throw new Error('Error inesperado')
    }
  }
  return response.status === 204 ? null : response.json()
}

export const registerUserFetcher = async (useData: TRegisterForm) => {
  const response = await fetch(urls.register, {
    method: 'POST',
    body: JSON.stringify(useData),
    headers: { 'Content-type': 'application/json' },
  })
  if (!response.ok)
    throw new Error(
      `Error al registrar usuario: ${response.statusText} (Status: ${response.status})`
    )

  if (response.status === 204) {
    return null
  }

  try {
    return await response.json()
  } catch (error) {
    throw new Error('Error parsing JSON response from server')
  }
}

const errorResourceMutations: { [key: number]: string } = {
  409: 'Error 409 - El recurso ya existe',
  500: 'Error 500 - Error bbdd',
}

export const createResourceFetcher = async (resource: object) => {
  const res = await fetch(urls.createResource, {
    method: 'POST',
    body: JSON.stringify(resource),
    headers: {
      'Content-type': 'application/json',
    },
  })

  if (!res.ok) {
    if (Object.hasOwnProperty.call(errorResourceMutations, res.status)) {
      throw new Error(errorResourceMutations[res.status])
    } else {
      throw new Error('Error inesperado')
    }
  }
  return res.status === 204 ? {} : res.json()
}

export const updateResourceFetcher = async (resource: object) => {
  const res = await fetch(urls.updateResource, {
    method: 'PATCH',
    body: JSON.stringify(resource),
    headers: {
      'Content-type': 'application/json',
    },
  })

  if (!res.ok) {
    if (Object.hasOwnProperty.call(errorResourceMutations, res.status)) {
      throw new Error(errorResourceMutations[res.status])
    } else {
      throw new Error('Error inesperado')
    }
  }

  return res.status === 204 ? {} : res.json()
}

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

export const patchUserStatus = async (updatedUser: TUserUpdatedStatus) => {
  const response = await fetch(urls.users, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  })
  if (!response.ok) {
    throw new Error('Failed to update user status')
  }
  return response.status === 204 ? {} : response.json()
}

type TGenerateDescription = {
  title: string
  url: string
  topic: string
  language: string
}

export const generateDescriptionFetcher = (
  generateDescription: TGenerateDescription
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> =>
  fetch(urls.generateDescription, {
    method: 'POST',
    body: JSON.stringify(generateDescription),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Error inesperado')
    }
    return res.status === 204 ? {} : res.json()
  })
