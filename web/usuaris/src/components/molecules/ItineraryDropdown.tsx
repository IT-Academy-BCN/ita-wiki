import styled from 'styled-components'
//import { Dropdown } from '@itacademy/ui'
import {
  Button,
  colors,
  dimensions,
  font,
  Spinner,
  Dropdown,
  type TDropdownOption,
} from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
//import { DropdownHeader } from '../../../../../packages/ui/src/components/atoms/Dropdown'
import { useGetItineraries } from '../../hooks'
import { icons } from '../../assets/icons'
import { FC, useEffect, useState } from 'react'
import {} from '@itacademy/ui'
import { type TItinerary } from './../../types'

//TODO:
/// 1.fetch getItineraries and pass to the component - from here??
//2. add imgs hardcaoded or ask for server
//3. adjust styles of dropdown
//4. pass selected item info to parent
//5. test all

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
    console.log(data)
    const newData = data?.map((cat: TItinerary) => ({
      ...cat,
      iconSvg: itineraryImg[cat.name],
    }))
    setItinerariesList(newData)
  }, [data])

  console.log(itinerariesList)

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
  return (
    <>
      {itinerariesList && itinerariesList?.length > 0 ? (
        <StyledDropdown
          options={itinerariesList}
          placeholder={t('Especialidad')}
          onValueChange={handleSelectedValue}
          // className={customDropdown}
        />
      ) : null}
    </>
  )
}
