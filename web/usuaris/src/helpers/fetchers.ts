import { urls } from '../constants'

export const getUsers = async () => {
  const response = await fetch(urls.getUsers)
  if (!response.ok) {
    throw new Error(`Error fetching users`)
  }
  const data = await response.json()
  return data
}

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
