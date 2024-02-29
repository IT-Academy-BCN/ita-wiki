import { urls } from '../constants'

export const getUsers = async () => {
  const response = await fetch(urls.getUsers)
  if (!response.ok) {
    throw new Error(`Error fetching users`)
  }
  const data = await response.json()
  return data
}
