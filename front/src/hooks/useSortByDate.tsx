import { useEffect, useState } from 'react'

type SortOrder = 'asc' | 'desc'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSortByDate = <T extends Record<string, any>>(
  items: T[] | undefined,
  sortBy: keyof T,
  sortOrder: SortOrder = 'desc'
) => {
  const [sortedItems, setSortedItems] = useState<T[]>([])

  useEffect(() => {
    if (items) {
      const sorted = [...items].sort((a, b) => {
        const dateA = new Date(a[sortBy] as string).getTime()
        const dateB = new Date(b[sortBy] as string).getTime()

        if (sortOrder === 'asc') {
          return dateA - dateB
        }
        return dateB - dateA
      })

      setSortedItems(sorted)
    }
  }, [items, sortOrder, sortBy])

  return { sortedItems }
}
