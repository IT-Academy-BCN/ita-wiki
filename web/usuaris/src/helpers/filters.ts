import qs from 'qs'
import { TFilters } from '../types'
import { TUser } from '../context/AuthProvider'
import { TMenu } from '../constants/menu'

export const buildQueryString = ({
  itinerarySlug,
  status,
  startDate,
  endDate,
  name,
  dni,
  role,
}: TFilters) =>
  qs.stringify(
    {
      itinerarySlug,
      status,
      startDate,
      endDate,
      name,
      dni,
      role,
    },
    {
      skipNulls: true,
      filter: (_prefix, value) => {
        if (value === '') return undefined
        return value
      },
    }
  )

export const filterMenuByUserRole = (user: TUser, item: TMenu) => {
  if (user?.role === 'MENTOR' && item.title === 'Mentores') {
    return null
  }
  return item.title
}
