import { ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import { CheckBox, Label, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'
import { useFiltersContext } from '../../context/store/context'
import { ActionTypes } from '../../context/store/types'

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

const StatusFilterWidget = () => {
  const { status, dispatch } = useFiltersContext()

  const changeSelection = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (e.target.checked) {
      dispatch({
        type: ActionTypes.SetStatus,
        payload: { status: [...status, item] },
      })
    } else {
      dispatch({
        type: ActionTypes.SetStatus,
        payload: {
          status: status.filter((el: string) => el !== item),
        },
      })
    }
    return [...status, item]
  }

  useEffect(() => {
    if (dispatch && status) {
      dispatch({ type: ActionTypes.SetStatus, payload: { status: statusData } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <StyledFlexbox direction="column" align="start" data-testid="status-filter">
      <StyledText fontWeight="bold">Estado</StyledText>
      {statusData.map((item: string) => (
        <CheckBoxStyled
          key={item}
          id={item}
          label={item === 'SEEN' ? 'Vistos' : 'Por ver'}
          defaultChecked
          onChange={(e) => changeSelection(e, item)}
        />
      ))}
    </StyledFlexbox>
  )
}

export { StatusFilterWidget }
