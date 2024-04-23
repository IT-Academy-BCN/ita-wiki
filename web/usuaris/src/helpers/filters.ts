import qs from 'qs'
import { TFilters } from '../types'

export const buildQueryString = ({
  itinerarySlug,
  status,
  startDate,
  endDate,
  name,
  dni,
  role,
}: TFilters) =>
  qs.stringify({
    itinerarySlug,
    status,
    startDate,
    endDate,
    name,
    dni,
    role,
  })
