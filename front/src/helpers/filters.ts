import qs from 'qs'
import { TFilters } from '../types'

export const buildQueryString = ({
  slug,
  resourceTypes,
  status,
  topic,
  search,
}: TFilters) =>
  qs.stringify({
    slug,
    resourceTypes,
    status,
    topic,
    search,
  })
