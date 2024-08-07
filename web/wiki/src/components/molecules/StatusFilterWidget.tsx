import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckboxFilterWidget, TCheckboxFilterItem } from '@itacademy/ui'
import { TStatusData } from '../../types'

const statusData: TStatusData[] = ['NOT_SEEN', 'SEEN']

type TStatusFilterWidget = {
  handleStatusFilter: (selectedStatus: TStatusData[]) => void
}

export const StatusFilterWidget: FC<TStatusFilterWidget> = ({
  handleStatusFilter,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<TCheckboxFilterItem[]>(
    []
  )

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
    const userSelectedItems = selectedItems.map(
      (item) => item.id as TStatusData
    )

    handleStatusFilter(userSelectedItems)
  }

  return (
    <div data-testid="status-filter">
      <CheckboxFilterWidget
        filterName={t('Estado')}
        items={selectedStatus}
        handleItemsFilter={handleSelectedStatus}
        defaultCheckedItems={selectedStatus}
      />
    </div>
  )
}
