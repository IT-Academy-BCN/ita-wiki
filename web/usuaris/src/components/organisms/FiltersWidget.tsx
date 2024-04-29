import { FC, useCallback } from 'react'
import styled from 'styled-components'
import { FlexBox, Search, dimensions } from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { DateRange, StatusDropdown } from '../molecules'
import { ItineraryDropdown } from '../molecules/ItineraryDropdown'
import { type TFilters, TItinerary, type TStatus } from '../../types'

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

  const handleStatus = (selectedStatus: TStatus | undefined) => {
    if (selectedStatus !== undefined) {
      handleFilters({ ...filters, status: selectedStatus.id })
    } else {
      const newFilters = { ...filters }
      delete newFilters.status
      handleFilters(newFilters)
    }
  }

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (searchValue !== '') {
        handleFilters({
          ...filters,
          name: searchValue,
          dni: searchValue,
        })
      } else {
        const newFilters = { ...filters }
        delete newFilters.name
        delete newFilters.dni
        handleFilters(newFilters)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <FiltersContainer
      direction="row"
      justify="flex-start"
      gap={dimensions.spacing.xs}
    >
      <ItineraryDropdown handleItinerary={handleItinerary} />
      <StatusDropdown handleStatus={handleStatus} />
      <DateRange
        labelStartDate={t('Fecha de inicio')}
        labelEndDate={t('Fecha final')}
        placeholderStartDate={t('De...')}
        placeholderEndDate={t('Hasta...')}
        dateFormat="dd/MM/yyyy"
        calendarLanguage={t('calendarLanguage')}
      />
      <Search
        id="usersSearch"
        name="usersSearch"
        label={t('Búsqueda de usuarios')}
        placeholder={t('Buscar')}
        isSearchError={false}
        handleSearchValue={handleSearch}
        searchIconName="search"
      />
    </FiltersContainer>
  )
}
