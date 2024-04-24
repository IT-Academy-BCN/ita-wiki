import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, dimensions } from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { DateRange } from '../molecules'
import { ItineraryDropdown } from '../molecules/ItineraryDropdown'
import { type TItinerary } from '../../types'
import { RolFilter } from '../molecules/RolFilter'
import { TRol } from '../../types/types'

const FiltersContainer = styled(FlexBox)`
  width: 100%;
`

export const FiltersWidget: FC = () => {
  const { t } = useTranslation()

  const handleItinerary = (itineraryId: TItinerary) => {
    // TODO: Use this info to filter
    // eslint-disable-next-line no-console
    console.log('selected', itineraryId)
  }
  const handleRole = (RolId: TRol) => {
    // TODO: Use this info to filter
    // eslint-disable-next-line no-console
    console.log('selectedRol', RolId)
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
