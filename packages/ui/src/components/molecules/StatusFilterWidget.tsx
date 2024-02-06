import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Checkbox, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'

const StyledFlexbox = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
`

const StyledText = styled(Text)`
  margin-top: ${dimensions.spacing.md};
  margin-bottom: 0.2rem;
`

const CheckBoxStyled = styled(Checkbox)`
  label {
    font-weight: ${font.medium};
    color: ${colors.black.black3};
    cursor: pointer;
  }
`

const statusData: string[] = ['NOT_SEEN', 'SEEN']

export type TStatusFilterWidget = {
  handleStatusFilter: (selectedStatus: string[]) => void
  statusName: string
  labelForSeen: string
  labelForNotSeen: string
}

export const StatusFilterWidget = ({
  handleStatusFilter,
  statusName,
  labelForSeen,
  labelForNotSeen,
}: TStatusFilterWidget) => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(statusData)

  useEffect(() => {
    handleStatusFilter(statusData)
  }, [handleStatusFilter])

  const changeSelection = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (e.target.checked) {
      const addStatus = [...selectedStatus]
      addStatus.push(item)
      setSelectedStatus(addStatus)
      return addStatus
    }

    const removeStatus = selectedStatus.filter((element) => element !== item)
    setSelectedStatus(removeStatus)
    return removeStatus
  }

  return (
    <StyledFlexbox direction="column" align="start" data-testid="status-filter">
      <StyledText fontWeight="bold"> {statusName} </StyledText>
      {statusData.map((item: string) => (
        <CheckBoxStyled
          key={item}
          id={item}
          label={item === 'SEEN' ? `${labelForSeen}` : `${labelForNotSeen}`}
          defaultChecked
          onChange={(e) => handleStatusFilter(changeSelection(e, item))}
        />
      ))}
    </StyledFlexbox>
  )
}
