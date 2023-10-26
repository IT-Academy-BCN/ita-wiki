import qs from 'qs'
import { TFilters } from '../types'

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
