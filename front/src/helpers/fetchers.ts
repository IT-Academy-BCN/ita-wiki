import { urls } from '../constants'

type TTopicReturned = {
  id: string
  name: string
  slug: string
  categoryId: string
}


export type TGetTopics = TTopicReturned[]
  

export const getTopics = async (slug?: string): Promise<TGetTopics> =>
  fetch(`${urls.getTopics}?category=${slug}`)
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

