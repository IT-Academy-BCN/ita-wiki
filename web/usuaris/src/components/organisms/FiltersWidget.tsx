import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, dimensions } from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { DateRange } from '../molecules'
import { ItineraryDropdown } from '../molecules/ItineraryDropdown'
import { type TItinerary } from './../../types'

const FiltersContainer = styled(FlexBox)`
  width: 100%;
`

export const FiltersWidget: FC = () => {
  const { t } = useTranslation()

  const handleItinerary = (itineraryId: TItinerary) => {
    console.log('selected', itineraryId)
  }

  return (
    <FiltersContainer
      direction="row"
      justify="flex-start"
      gap={dimensions.spacing.xs}
    >
      <ItineraryDropdown handleItinerary={handleItinerary} />
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
