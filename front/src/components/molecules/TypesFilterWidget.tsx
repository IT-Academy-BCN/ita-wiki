import { useState, useEffect, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { CheckBox, Label, Spinner, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'
import { useFiltersContext } from '../../context/store/context'
import { getTypes } from '../../helpers/fetchers'
import { ActionTypes } from '../../context/store/types'

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

type TTypesFilterWidget = {
  handleTypesFilter: (selectedTypes: TData) => void
}

type TData = string[]

type TError = {
  message: string
}

const TypesFilterWidget = ({ handleTypesFilter }: TTypesFilterWidget) => {
  const { isLoading, data, error } = useQuery<TData, TError>({
    queryKey: ['getTypes'],
    queryFn: () => getTypes(),
  })

  const [selectedTypes, setSelectedTypes] = useState<TData>([])

  // useEffect(() => {
  //   if (data !== undefined) {
  //     setSelectedTypes(data)
  //     handleTypesFilter(data)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data])

  const changeSelection = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (e.target.checked) {
      const addTypes = [...selectedTypes]
      addTypes.push(item)
      setSelectedTypes(addTypes)
      return addTypes
    }

    const removeTypes = selectedTypes.filter((el: string) => el !== item)
    setSelectedTypes(removeTypes)
    return removeTypes
  }

  // TESTING FILTERS
  const { types, dispatch } = useFiltersContext()

  useEffect(() => {
    if (dispatch && data) {
      dispatch({ type: ActionTypes.SetTypes, payload: { types: data } })
    }
  }, [dispatch, data])

  useEffect(() => {
    if (types !== undefined) {
      setSelectedTypes(types)
      handleTypesFilter(types)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types])

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
          onChange={(e) => handleTypesFilter(changeSelection(e, item))}
        />
      ))}
    </StyledFlexbox>
  )
}

export { TypesFilterWidget }
