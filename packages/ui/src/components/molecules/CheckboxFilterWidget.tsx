import { FC, useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { Checkbox, Label, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'

const StyledLabel = styled(Label)``

const CheckboxStyled = styled(Checkbox)`
  ${StyledLabel} {
    font-weight: ${font.medium};
    color: ${colors.black.black3};
    cursor: pointer;
  }
`

export type TCheckboxFilterItem = {
  id: string
  label: string
}

export type TCheckboxFilterWidget = {
  direction?: 'row' | 'column'
  filterName?: string
  items: TCheckboxFilterItem[]
  handleItemsFilter: (selectedItems: TCheckboxFilterItem[]) => void
  defaultCheckedItems?: TCheckboxFilterItem[]
}

export const CheckboxFilterWidget: FC<TCheckboxFilterWidget> = ({
  direction = 'column',
  filterName,
  items,
  handleItemsFilter,
  defaultCheckedItems,
}) => {
  const [selectedItems, setSelectedItems] = useState<TCheckboxFilterItem[]>([])

  useEffect(() => {
    if (defaultCheckedItems && defaultCheckedItems?.length > 0) {
      handleItemsFilter(defaultCheckedItems)
      setSelectedItems(defaultCheckedItems)
    } else {
      handleItemsFilter([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCheckedItems])

  const changeSelection = (
    e: ChangeEvent<HTMLInputElement>,
    item: TCheckboxFilterItem
  ) => {
    if (e.target.checked) {
      const addItems = [...selectedItems]
      addItems.push(item)
      setSelectedItems(addItems)
      return addItems
    }

    const removeItems = selectedItems.filter((el) => el !== item)
    setSelectedItems(removeItems)
    return removeItems
  }

  return (
    <FlexBox
      direction={direction}
      align={direction === 'column' ? 'start' : 'center'}
      gap={`${dimensions.spacing.xs}`}
      data-testid="container"
    >
      {filterName ? (
        <Text
          fontWeight="bold"
          style={{
            marginBottom: direction === 'column' ? `0.2rem` : `none`,
            marginRight:
              direction === 'column' ? `none` : `${dimensions.spacing.base}`,
          }}
        >
          {filterName}
        </Text>
      ) : null}
      {items?.map((item: TCheckboxFilterItem) => (
        <CheckboxStyled
          key={item.id}
          id={item.id}
          label={item.label}
          defaultChecked={defaultCheckedItems?.some(
            (checkedItem) => checkedItem.id === item.id
          )}
          onChange={(e) => handleItemsFilter(changeSelection(e, item))}
        />
      ))}
    </FlexBox>
  )
}
