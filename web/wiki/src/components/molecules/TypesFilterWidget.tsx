import { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  CheckboxFilterWidget,
  dimensions,
  FlexBox,
  Spinner,
  TCheckboxFilterItem,
  Text,
} from '@itacademy/ui'
import { TGetTypes, TTypesFilterWidget } from '../../types/types'
import { useGetTypes } from '../../hooks'

const StyledFlexbox = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
`

const StyledText = styled(Text)`
  margin-top: ${dimensions.spacing.md};
  margin-bottom: 0.2rem;
`

const StyledSpinner = styled(Spinner)`
  align-self: center;
  justify-content: center;
`

export const TypesFilterWidget: FC<TTypesFilterWidget> = ({
  handleTypesFilter,
}) => {
  const { isLoading, data, error } = useGetTypes()
  const [selectedTypes, setSelectedTypes] = useState<TCheckboxFilterItem[]>([])

  const { t } = useTranslation()

  const mapTypeLabel = (type: string): string =>
    type === 'TUTORIAL'
      ? t('Curso')
      : t(`${type.slice(0, 1) + type.slice(1).toLowerCase()}`)

  useEffect(() => {
    if (data !== undefined) {
      const typeData: TCheckboxFilterItem[] = data.map((item: string) => ({
        id: item,
        label: mapTypeLabel(item),
      }))

      setSelectedTypes(typeData)
      handleTypesFilter(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, t])

  const handleSelectedTypes = (selectedItems: TCheckboxFilterItem[]) => {
    const userSelectedItems: TGetTypes = selectedItems.map((item) => item.id)

    handleTypesFilter(userSelectedItems)
  }

  if (error) return <p>{t('Ha habido un error...')}</p>

  return (
    <StyledFlexbox direction="column" align="start" data-testid="types-filter">
      <StyledText fontWeight="bold">{t('Tipo')}</StyledText>
      {isLoading && <StyledSpinner size="small" role="status" />}
      {selectedTypes && selectedTypes.length > 0 ? (
        <CheckboxFilterWidget
          items={selectedTypes}
          handleItemsFilter={handleSelectedTypes}
          defaultCheckedItems={selectedTypes}
        />
      ) : null}
    </StyledFlexbox>
  )
}
