import { urls } from '../constants'
import { TUpdatedUser } from '../types'

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

export const getUsers = async (filters: string) => {
  const response = await fetch(`${urls.getUsers}?${filters}`)
  if (!response.ok) {
    throw new Error(`Error fetching users`)
  }
  const data = await response.json()
  return data
}

export const loginUserFetcher = async (user: object) => {
  const errorMessage: { [key: number]: string } = {
    401: 'Credenciales incorrectas.',
    403: 'Sólo accesible a usuarios administradores activos.',
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

export const patchUser = async (updatedUser: TUpdatedUser) => {
  const response = await fetch(`${urls.patchUser}${updatedUser.id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedUser),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Failed to update user')
  }
  return response.status === 204 ? {} : response.json()
}

export const deleteUser = async (userId: string) => {
  const response = await fetch(`${urls.deleteUser}${userId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
  return response.status === 204 ? {} : response.json()
}
