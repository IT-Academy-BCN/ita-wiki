import { useEffect, useState } from 'react'
import { TSortOrder } from '../types'

export const useSortByDate = <T extends Record<string, unknown>>(
  items: T[] | undefined,
  sortBy: keyof T,
  sortOrder: TSortOrder = 'desc'
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
