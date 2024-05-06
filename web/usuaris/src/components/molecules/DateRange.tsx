import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { type Locale } from 'date-fns'
import es from 'date-fns/locale/es'
import ca from 'date-fns/locale/ca'
import enIN from 'date-fns/locale/en-IN'
import { FlexBox, Icon, Label, colors, dimensions, font } from '@itacademy/ui'
import { icons } from '../../assets/icons'

const ContainerStyled = styled(FlexBox)`
  width: auto;
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
`

const CloseIconStyled = styled(Icon)`
  padding: ${dimensions.spacing.xxxs};
`

const CalendarIconStyled = styled.img`
  padding: ${dimensions.spacing.xs};
`

const DatePickerStyled = styled(DatePicker)`
  border: 0;
  border-left: 1px solid ${colors.gray.gray4};
  border-radius: 0 ${dimensions.borderRadius.base}
    ${dimensions.borderRadius.base} 0;
  max-height: 2.7rem;
  max-width: 7.5rem;
  padding: ${dimensions.spacing.base};
  font-family: ${font.fontFamily};
  font-size: ${font.xs};
  color: ${colors.gray.gray3};
  line-height: 1;

  &:focus {
    outline: 0 none;
  }
`

export type TDateRange = {
  labelStartDate: string
  labelEndDate: string
  placeholderStartDate: string
  placeholderEndDate: string
  dateFormat: 'dd/MM/yyyy' | 'yyyy/MM/dd' | 'MM/dd/yyyy'
  calendarLanguage: 'ca' | 'es' | 'en-IN'
  handleDates: (startDate: Date | null, endDate: Date | null) => void
}

export const DateRange: FC<TDateRange> = ({
  labelStartDate,
  labelEndDate,
  placeholderStartDate,
  placeholderEndDate,
  dateFormat,
  calendarLanguage,
  handleDates,
}) => {
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  })

  const [locale, setLocale] = useState<Locale>(enIN)

  useEffect(() => {
    switch (calendarLanguage) {
      case 'ca':
        setLocale(ca)
        break
      case 'es':
        setLocale(es)
        break
      case 'en-IN':
        setLocale(enIN)
        break
      default:
        setLocale(enIN)
    }

    registerLocale(calendarLanguage, locale)
    setDefaultLocale(calendarLanguage)
  }, [calendarLanguage, locale])

  useEffect(() => {
    handleDates(dates.startDate, dates.endDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates])

  const handleClose = () => {
    setDates({
      startDate: null,
      endDate: null,
    })
  }
  const handleChangeDate = (
    date: Date | [Date | null, Date | null] | null,
    name: string
  ) => {
    if (Array.isArray(date)) {
      setDates((prevDate) => ({
        ...prevDate,
        [name]: date[0],
      }))
    } else {
      setDates((prevDate) => ({
        ...prevDate,
        [name]: date,
      }))
    }
  }

  return (
    <ContainerStyled direction="row">
      {dates.startDate !== null || dates.endDate !== null ? (
        <CloseIconStyled
          data-testid="close-button-test"
          name="close"
          onClick={handleClose}
        />
      ) : (
        <CalendarIconStyled src={icons.calendar} alt="Calendar" />
      )}
      <Label text={labelStartDate} htmlFor="startDate" hiddenLabel />
      <DatePickerStyled
        id="startDate"
        name="startDate"
        selected={dates.startDate}
        onChange={(date) => {
          handleChangeDate(date, 'startDate')
        }}
        selectsStart
        startDate={dates.startDate}
        endDate={dates.endDate}
        placeholderText={placeholderStartDate}
        dateFormat={dateFormat}
      />
      <Label text={labelEndDate} htmlFor="endDate" hiddenLabel />
      <DatePickerStyled
        id="endDate"
        name="endDate"
        selected={dates.endDate}
        onChange={(date) => {
          handleChangeDate(date, 'endDate')
        }}
        selectsEnd
        startDate={dates.startDate}
        endDate={dates.endDate}
        minDate={dates.startDate}
        placeholderText={placeholderEndDate}
        dateFormat={dateFormat}
      />
    </ContainerStyled>
  )
}
