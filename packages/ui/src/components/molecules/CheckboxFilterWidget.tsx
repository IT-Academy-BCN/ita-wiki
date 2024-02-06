import { FC, useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { Checkbox, Label, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'

const StyledLabel = styled(Label)``

const StyledFlexbox = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
`

const CheckboxStyled = styled(Checkbox)`
  ${StyledLabel} {
    font-weight: ${font.medium};
    color: ${colors.black.black3};
    cursor: pointer;
  }
`

export type TItems = string[]

export type TCheckboxFilterWidget = {
  direction?: 'row' | 'column'
  filterName?: string
  items: TItems
  handleItemsFilter: (selectedItems: TItems) => void
  defaultCheckedItems?: TItems
}

export const CheckboxFilterWidget: FC<TCheckboxFilterWidget> = ({
  direction = 'column',
  filterName,
  items,
  handleItemsFilter,
  defaultCheckedItems,
}) => {
  const [selectedItems, setSelectedItems] = useState<TItems>([])

  useEffect(() => {
    if (defaultCheckedItems && defaultCheckedItems?.length > 0) {
      handleItemsFilter(defaultCheckedItems)
      setSelectedItems(defaultCheckedItems)
    } else {
      handleItemsFilter([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeSelection = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (e.target.checked) {
      const addTypes = [...selectedItems]
      addTypes.push(item)
      setSelectedItems(addTypes)
      return addTypes
    }

    const removeTypes = selectedItems.filter((el: string) => el !== item)
    setSelectedItems(removeTypes)
    return removeTypes
  }

  return (
    <StyledFlexbox
      direction={direction}
      align={direction === 'column' ? 'start' : 'center'}
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
      {items?.map((item: string) => (
        <CheckboxStyled
          key={item}
          id={item}
          label={item}
          defaultChecked={defaultCheckedItems?.includes(item)}
          onChange={(e) => handleItemsFilter(changeSelection(e, item))}
        />
      ))}
    </StyledFlexbox>
  )
}
