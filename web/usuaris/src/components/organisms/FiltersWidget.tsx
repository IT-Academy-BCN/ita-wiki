import { FC, useCallback } from 'react'
import styled from 'styled-components'
import { FlexBox, Search, dimensions } from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { DateRange, StatusDropdown } from '../molecules'
import { ItineraryDropdown } from '../molecules/ItineraryDropdown'
import { type TFilters, TItinerary, UserStatus } from '../../types'
import { RoleFilter } from '../molecules/RoleFilter'
import { TRole } from '../../types/types'

const FiltersContainer = styled(FlexBox)`
  width: 100%;
`

type TFiltersWidget = {
  filters: TFilters
  setFilters: (filters: TFilters) => void
}

export const FiltersWidget: FC<TFiltersWidget> = ({ filters, setFilters }) => {
  const { t } = useTranslation()

  const handleItinerary = (itinerary: TItinerary | undefined) => {
    setFilters({ ...filters, itinerarySlug: itinerary?.slug })
  }
  const handleRole = (role: TRole | undefined) => {
    setFilters({ ...filters, role: role?.slug })
  }

  const handleStatus = (selectedStatus: UserStatus | undefined) => {
    setFilters({ ...filters, status: selectedStatus })
  }

  const handleSearch = useCallback(
    (searchValue: string) => {
      setFilters({
        ...filters,
        name: searchValue,
        dni: searchValue,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  )

  const handleDates = (startDate: Date | null, endDate: Date | null) => {
    setFilters({
      ...filters,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    })
  }

  return (
    <FiltersContainer
      direction="row"
      justify="flex-start"
      gap={dimensions.spacing.xs}
    >
      <ItineraryDropdown handleItinerary={handleItinerary} />
      <StatusDropdown handleStatus={handleStatus} />
      <RoleFilter handleRole={handleRole} />

      <DateRange
        labelStartDate={t('Fecha de inicio')}
        labelEndDate={t('Fecha final')}
        placeholderStartDate={t('De...')}
        placeholderEndDate={t('Hasta...')}
        dateFormat="dd/MM/yyyy"
        calendarLanguage={t('calendarLanguage')}
        handleDates={handleDates}
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
