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
  items: TResource[],
  sortOrder: 'ascending' | 'descending' = 'descending'
) => {
  const [sortedItems, setSortedItems] = useState<TResource[]>(items)

  useEffect(() => {
    if (sortOrder === 'ascending')
      setSortedItems(
        [...items].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      )

    if (sortOrder === 'descending')
      setSortedItems(
        [...items].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      )
  }, [items, sortOrder])

  return { sortedItems }
}
