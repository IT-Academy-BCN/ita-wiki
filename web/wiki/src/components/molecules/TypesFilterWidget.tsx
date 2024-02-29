import { useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { CheckBox, Label, Spinner, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'
import { TGetTypes, TTypesFilterWidget } from '../../types/types'
import { useGetTypes } from '../../hooks'

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
  const { t } = useTranslation()

  const [selectedTypes, setSelectedTypes] = useState<TGetTypes>([])

  useEffect(() => {
    if (data !== undefined) {
      setSelectedTypes(data)
      handleTypesFilter(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
  const mapTypeLabel = (type: string): string =>
    type === 'TUTORIAL'
      ? t('Curso')
      : type.slice(0, 1) + type.slice(1).toLowerCase()
  if (error) return <p>Ha habido un error...</p>
  return (
    <StyledFlexbox direction="column" align="start" data-testid="types-filter">
      <StyledText fontWeight="bold">{t('Tipo')}</StyledText>
      {isLoading && <StyledSpinner size="small" role="status" />}
      {data?.map((item: string) => (
        <CheckBoxStyled
          key={item}
          id={item}
          label={mapTypeLabel(item)}
          defaultChecked
          onChange={(e) => handleTypesFilter(changeSelection(e, item))}
        />
      ))}
    </StyledFlexbox>
  )
}

export { TypesFilterWidget }
