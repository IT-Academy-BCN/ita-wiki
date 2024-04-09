import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Select, colors, dimensions, font } from '@itacademy/ui'
import { languages, type Language } from '../../constants'

const DropdownLang = styled(Select)<{ selectedLanguage: Language }>`
  font-size: ${font.base};
  border: none;
  border-radius: ${dimensions.borderRadius.base};
  font-weight: ${font.regular};
  background-color: ${colors.white};
  margin: 0;
  padding: 0.47rem;
  color: ${colors.gray.gray3};
  width: ${({ selectedLanguage }) =>
    selectedLanguage === 'cat' ? '69px' : '57px'};
  height: 40px;
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  &:focus {
    outline: 0 none;
  }
`

export const SelectLanguage: FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | string>(
    localStorage.getItem('lng') ?? 'cat'
  )

  const {
    i18n: { changeLanguage },
  } = useTranslation()

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value as Language)
    localStorage.setItem('lng', event.target.value)
    changeLanguage(event.target.value)
  }

  return (
    <DropdownLang
      selectedLanguage={selectedLanguage as Language}
      placeholder=""
      defaultValue={selectedLanguage}
      onChange={handleLanguageChange}
      options={languages}
    />
  )
}
