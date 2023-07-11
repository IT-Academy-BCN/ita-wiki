import { useEffect, useState } from 'react'

type TTopic = {
  topic: {
    id: string
    name: string
    slug: string
    categoryId: string
    createdAt: string
    updatedAt: string
  }
}
export type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
  resourceType: string
  topics: TTopic[]
}

export const useSortByDate = (
  items: TResource[] | undefined,
  sortOrder: 'ascending' | 'descending' = 'descending'
) => {
  const [sortedItems, setSortedItems] = useState<TResource[]>([])

  useEffect(() => {
    if (items) {
      const sorted = [...items].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()

        if (sortOrder === 'ascending') {
          return dateA - dateB
        }
        return dateB - dateA
      })

      setSortedItems(sorted)
    }
  }, [items, sortOrder])

  return { sortedItems }
}
