import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { CheckBox, Label, Spinner, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'
import { urls } from '../../constants'

const StyledFlexbox = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
`

const StyledText = styled(Text)`
  margin-top: ${dimensions.spacing.md};
  margin-bottom: 0.2rem;
`

const StyledSpinner = styled(Spinner)`
  width: 50px;
  height: 50px;
  align-self: center;
  justify-content: center;
`

const CheckBoxStyled = styled(CheckBox)`
  ${Label} {
    font-weight: ${font.regular};
    color: ${colors.black.black3};
    cursor: pointer;
  }
`

const getTypes = () =>
  fetch(urls.getTypes, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching resources: ${res.statusText}`)
      }

      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching resources: ${err.message}`)
    })

type Props = {
  selectedTypes: string[]
  setSelectedTypes: Dispatch<SetStateAction<string[]>>
}

const TypesFilterWidget = ({ selectedTypes, setSelectedTypes }: Props) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['getTypes'],
    queryFn: () => getTypes(),
  })

  useEffect(() => {
    setSelectedTypes(data)
  }, [data])

  if (error) return <p>Ha habido un error...</p>

  const handleChange = (checkedType: string) => {
    if (selectedTypes?.includes(checkedType)) {
      const newSelectedTypes = selectedTypes.filter(
        (item) => item !== checkedType
      )
      setSelectedTypes(newSelectedTypes)
    } else {
      setSelectedTypes((prevSelectedTypes) => [
        ...prevSelectedTypes,
        checkedType,
      ])
    }
  }

  return (
    <StyledFlexbox direction="column" align="start">
      <StyledText fontWeight="bold">Tipo</StyledText>
      {isLoading && <StyledSpinner role="status" />}
      {data?.map((item: string) => (
        <CheckBoxStyled
          key={item}
          id={item}
          label={`${item.slice(0, 1)}${item.slice(1).toLowerCase()}`}
          defaultChecked
          onChange={() => handleChange(item)}
        />
      ))}
    </StyledFlexbox>
  )
}

export { TypesFilterWidget }
