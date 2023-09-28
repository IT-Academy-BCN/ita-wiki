import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, device, font } from '../../styles'

type Language = 'es' | 'cat' | 'en'

const DropdownLang = styled.select`
  font-size: ${font.base};
  border: none;
  border-radius: 20%;
  font-weight: ${font.regular};
  color: ${colors.black.black1};
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0 none;
  }
  @media ${device.Tablet} {
    margin: 0;
    padding: 0.47rem;
    color: ${colors.gray.gray3};
  }
`

export const SelectLanguage: React.FC = () => {
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
    <div>
      <DropdownLang value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="cat">CAT</option>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </DropdownLang>
    </div>
  )
}
