import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, dimensions } from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { DateRange } from '../molecules'

const FiltersContainer = styled(FlexBox)`
  width: 100%;
`

export const FiltersWidget: FC = () => {
  const { t } = useTranslation()

  return (
    <FiltersContainer
      direction="row"
      justify="flex-start"
      gap={dimensions.spacing.xs}
    >
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
