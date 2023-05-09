import { useRef, useState } from "react"
import { resources } from "../../pages/Home"

export const useSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const [searchResources, setSearchResources] = useState(resources)

  const iconClick = () => {
    const searchValue = searchRef.current?.value || ''
    setSearchResources(
      resources.filter((resource) =>
        resource.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
  }

  return { iconClick, searchRef, searchResources }
}
