import { useState, useEffect, FC } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  CheckboxFilterWidget,
  Spinner,
  TCheckboxFilterItem,
  Text,
} from '@itacademy/ui'
import { TResourceType, TTypesFilterWidget } from '../../types/types'
import {
  type ListResourceTypesResponse,
  useListResourceTypes,
} from '../../openapi/openapiComponents'

const StyledSpinner = styled(Spinner)`
  align-self: center;
  justify-content: center;
`

export const TypesFilterWidget: FC<TTypesFilterWidget> = ({
  handleTypesFilter,
}) => {
  const { isLoading, data, error } = useListResourceTypes({})
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
    const userSelectedItems: ListResourceTypesResponse = selectedItems.map(
      (item) => item.id as TResourceType
    )

    handleTypesFilter(userSelectedItems)
  }

  if (error) return <p>{t('Ha habido un error...')}</p>

  return (
    <div data-testid="types-filter">
      {isLoading && (
        <>
          <Text fontWeight="bold">{t('Tipo')}</Text>
          <StyledSpinner size="small" role="status" />
        </>
      )}
      {data ? (
        <CheckboxFilterWidget
          filterName={t('Tipo')}
          items={selectedTypes}
          handleItemsFilter={handleSelectedTypes}
          defaultCheckedItems={selectedTypes}
        />
      ) : null}
    </div>
  )
}
