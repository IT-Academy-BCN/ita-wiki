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