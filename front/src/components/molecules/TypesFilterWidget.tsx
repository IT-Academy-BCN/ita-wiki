import { useEffect, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { CheckBox, Label, Spinner, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'

import { useFiltersContext } from '../../context/store/context'
import { ActionTypes } from '../../context/store/types'
import { getTypes } from '../../helpers/fetchers'

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
const CheckBoxStyled = styled(CheckBox)`
  ${Label} {
    font-weight: ${font.medium};
    color: ${colors.black.black3};
    cursor: pointer;
  }
`

const TypesFilterWidget = ({ handleTypesFilter }: TTypesFilterWidget) => {
  const { isLoading, data, error } = useGetTypes()

  const { types, dispatch } = useFiltersContext()

  const changeSelection = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (e.target.checked) {
      dispatch({
        type: ActionTypes.SetTypes,
        payload: { types: [...types, item] },
      })
    } else {
      dispatch({
        type: ActionTypes.SetTypes,
        payload: {
          types: types.filter((el: string) => el !== item),
        },
      })
    }
    return [...types, item]
  }

  useEffect(() => {
    if (dispatch && data) {
      dispatch({ type: ActionTypes.SetTypes, payload: { types: data } })
    }
  }, [dispatch, data])

  if (error) return <p>Ha habido un error...</p>

  return (
    <StyledFlexbox direction="column" align="start" data-testid="types-filter">
      <StyledText fontWeight="bold">Tipo</StyledText>
      {isLoading && <StyledSpinner size="small" role="status" />}
      {data?.map((item: string) => (
        <CheckBoxStyled
          key={item}
          id={item}
          label={`${item.slice(0, 1)}${item.slice(1).toLowerCase()}`}
          defaultChecked
          onChange={(e) => changeSelection(e, item)}
        />
      ))}
    </StyledFlexbox>
  )
}

export { TypesFilterWidget }
