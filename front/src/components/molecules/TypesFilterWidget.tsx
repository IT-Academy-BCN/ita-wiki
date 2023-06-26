import { useState, useEffect, ChangeEvent } from 'react'
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
    font-weight: ${font.medium};
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
  handleTypesFilter: (selectedTypes: string[]) => void
}

const TypesFilterWidget = ({ handleTypesFilter }: Props) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['getTypes'],
    queryFn: () => getTypes(),
  })

  const [selectedTypes, setSelectedTypes] = useState<string[]>(data)

  useEffect(() => {
    setSelectedTypes(data)
    handleTypesFilter(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const changeSelection = (e: ChangeEvent<HTMLInputElement>, item: string) => {
    if (e.target.checked) {
      const addTypes = [...selectedTypes]
      addTypes.push(item)
      setSelectedTypes(addTypes)
      return addTypes
    }

    const removeTypes = selectedTypes.filter((el) => el !== item)
    setSelectedTypes(removeTypes)
    return removeTypes
  }

  if (error) return <p>Ha habido un error...</p>

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
          onChange={(e) => handleTypesFilter(changeSelection(e, item))}
        />
      ))}
    </StyledFlexbox>
  )
}

export { TypesFilterWidget }
