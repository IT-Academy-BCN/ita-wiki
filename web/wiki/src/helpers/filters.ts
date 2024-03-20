import qs from 'qs'
import { TFilters } from '../types'

export const buildQueryString = ({
  categorySlug,
  resourceTypes,
  status,
  topic,
  search,
}: TFilters) =>
  qs.stringify({
    categorySlug,
    resourceTypes,
    status,
    topic,
    search,
  })
