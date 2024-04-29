import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, dimensions } from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { DateRange } from '../molecules'
import { ItineraryDropdown } from '../molecules/ItineraryDropdown'
import { RolFilter } from '../molecules/RolFilter'
import { TRol } from '../../types/types'
import { type TFilters, TItinerary } from '../../types'

const FiltersContainer = styled(FlexBox)`
  width: 100%;
`

type TFiltersWidget = {
  filters: TFilters
  handleFilters: (filters: TFilters) => void
}

export const FiltersWidget: FC<TFiltersWidget> = ({
  filters,
  handleFilters,
}) => {
  const { t } = useTranslation()

  const handleItinerary = (itinerary: TItinerary | undefined) => {
    if (itinerary !== undefined) {
      handleFilters({ ...filters, itinerarySlug: itinerary.slug })
    } else {
      const newFilters = { ...filters }
      delete newFilters.itinerarySlug
      handleFilters(newFilters)
    }
  }
  const handleRole = (role: TRol | undefined) => {
    if (role === undefined) {
      const newFilters = { ...filters }
      delete newFilters.role
      handleFilters(newFilters)
    } else {
      handleFilters({ ...filters, role: role.slug })
    }
  }

  return (
    <FiltersContainer
      direction="row"
      justify="flex-start"
      gap={dimensions.spacing.xs}
    >
      <ItineraryDropdown handleItinerary={handleItinerary} />
      <RolFilter handleRole={handleRole} />
      <DateRange
        labelStartDate={t('Fecha de inicio')}
        labelEndDate={t('Fecha final')}
        placeholderStartDate={t('De...')}
        placeholderEndDate={t('Hasta...')}
        dateFormat="dd/MM/yyyy"
        calendarLanguage={t('calendarLanguage')}
      />
    </FiltersContainer>
  )
}
