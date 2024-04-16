import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  colors,
  dimensions,
  Dropdown,
  font,
  Spinner,
  type TDropdownOption,
} from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { useGetItineraries } from '../../hooks'
import { type TItinerary } from '../../types'
import { icons } from '../../assets/icons'

const StyledDropdown = styled(Dropdown)`
  && button {
    width: 210px;
    padding: ${dimensions.spacing.xxs};
    font-size: ${font.xs};
    font-weight: 500;

    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }

    > span {
      padding-left: ${dimensions.spacing.xxxs};
      font-weight: 400;
    }
  }
`

// TODO: Remove once we receive img property from the API
const itineraryImg: Record<string, string> = {
  'Frontend Angular': icons.angular,
  'Data Science': icons.dataScience,
  'Backend Java': icons.java,
  'Backend Node.js': icons.node,
  'Full Stack PHP': icons.php,
  'Frontend React': icons.react,
}

type TItineraryItem = {
  iconSvg: string
} & TItinerary

type TItineraryDropdown = {
  handleItinerary: (value: TItinerary) => void
}

export const ItineraryDropdown: FC<TItineraryDropdown> = ({
  handleItinerary,
}) => {
  const { t } = useTranslation()

  const [itinerariesList, setItinerariesList] = useState<TItineraryItem[]>([])
  const { isLoading, error, data } = useGetItineraries()

  useEffect(() => {
    const newData = data?.map((cat: TItinerary) => ({
      ...cat,
      iconSvg: itineraryImg[cat.name],
    }))
    setItinerariesList(newData)
  }, [data])

  const handleSelectedValue = (selectedOption: TDropdownOption) => {
    const selectedItinerary = data.find(
      (cat: TItinerary) => cat.id === selectedOption.id
    )
    handleItinerary(selectedItinerary)
  }

  if (isLoading) {
    return <Spinner size="small" as="output" data-testid="spinner" />
  }

  if (error) return <p>{t('Ha habido un error...')} </p>

  return itinerariesList && itinerariesList.length > 0 ? (
    <StyledDropdown
      options={itinerariesList}
      placeholder={t('Especialidad')}
      onValueChange={handleSelectedValue}
    />
  ) : null
}