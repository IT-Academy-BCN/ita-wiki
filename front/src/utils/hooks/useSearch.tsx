import { useEffect, useState } from 'react'

type TObjectWithTitle = {
  title: string
  [key: string]: any
}

export const useSearch = (items: TObjectWithTitle[], query: string) => {
  const [filteredItems, setFilteredItems] = useState<TObjectWithTitle[]>(items)

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase()

      setFilteredItems(
        items.filter((item) =>
          item.title.toLowerCase().includes(lowerCaseQuery)
        )
      )
    } else {
      setFilteredItems(items)
    }
  }, [items, query])

  return { filteredItems }
}
