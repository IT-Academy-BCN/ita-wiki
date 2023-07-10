import qs from 'qs'

export type TFilters = {
  slug?: string
  resourceTypes?: string[]
  status?: string[]
  topic?: string
}

export const buildQueryString = ({
  slug,
  resourceTypes,
  status,
  topic,
}: TFilters) =>
  qs.stringify({
    slug,
    resourceTypes,
    status,
    topic,
  })
