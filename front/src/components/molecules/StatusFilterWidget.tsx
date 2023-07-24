import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CheckBox, Label, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'

const StyledFlexbox = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
`

const StyledText = styled(Text)`
  margin-top: ${dimensions.spacing.md};
  margin-bottom: 0.2rem;
`

const CheckBoxStyled = styled(CheckBox)`
  ${Label} {
    font-weight: ${font.medium};
    color: ${colors.black.black3};
    cursor: pointer;
  }
`

const statusData: string[] = ['NOT_SEEN', 'SEEN']

type Props = {
  handleStatusFilter: (selectedStatus: string[]) => void
}

const StatusFilterWidget = ({ handleStatusFilter }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(statusData)

  useEffect(() => {
    handleStatusFilter(statusData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeSelection = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (e.target.checked) {
      const addStatus = [...selectedStatus]
      addStatus.push(item)
      setSelectedStatus(addStatus)
      return addStatus
    }

    const removeStatus = selectedStatus.filter((el) => el !== item)
    setSelectedStatus(removeStatus)
    return removeStatus
  }

  return (
    <StyledFlexbox direction="column" align="start" data-testid="status-filter">
      <StyledText fontWeight="bold">Estado</StyledText>
      {statusData.map((item: string) => (
        <CheckBoxStyled
          key={item}
          id={item}
          label={item === 'SEEN' ? 'Vistos' : 'Por ver'}
          defaultChecked
          onChange={(e) => handleStatusFilter(changeSelection(e, item))}
        />
      ))}
    </StyledFlexbox>
  )
}

export { StatusFilterWidget }
