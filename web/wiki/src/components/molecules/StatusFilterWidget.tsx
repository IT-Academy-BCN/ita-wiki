import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  CheckboxFilterWidget,
  dimensions,
  FlexBox,
  TCheckboxFilterItem,
  Text,
} from '@itacademy/ui'

const StyledFlexbox = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
`

const StyledText = styled(Text)`
  margin-top: ${dimensions.spacing.md};
  margin-bottom: 0.2rem;
`

const statusData: string[] = ['NOT_SEEN', 'SEEN']

type TStatusFilterWidget = {
  handleStatusFilter: (selectedStatus: string[]) => void
}

const StatusFilterWidget: FC<TStatusFilterWidget> = ({
  handleStatusFilter,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<
    TCheckboxFilterItem[] | null
  >(null)

  const { t } = useTranslation()

  useEffect(() => {
    const statusItems: TCheckboxFilterItem[] = statusData.map(
      (item: string) => ({
        id: item,
        label: item === 'SEEN' ? t('Vistos') : t('Por ver'),
      })
    )

    setSelectedStatus(statusItems)
    handleStatusFilter(statusData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const handleSelectedStatus = (selectedItems: TCheckboxFilterItem[]) => {
    const userSelectedItems: string[] = selectedItems.map((item) => item.id)

    handleStatusFilter(userSelectedItems)
  }

  return (
    <StyledFlexbox direction="column" align="start" data-testid="status-filter">
      <StyledText fontWeight="bold">{t('Estado')}</StyledText>
      {selectedStatus && selectedStatus.length > 0 ? (
        <CheckboxFilterWidget
          items={selectedStatus}
          handleItemsFilter={handleSelectedStatus}
          defaultCheckedItems={selectedStatus}
        />
      ) : null}
    </StyledFlexbox>
  )
}

export { StatusFilterWidget }
