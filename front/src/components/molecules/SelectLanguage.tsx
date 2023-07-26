import React, { useState } from 'react'
import styled from 'styled-components'
import { colors, device, font } from '../../styles'

type Language = 'esp' | 'cat'

const DropdownLang = styled.select`
  font-size: ${font.base};
  border: none;
  border-radius: 20%;
  font-weight: ${font.regular};
  color: ${colors.black.black1};
  margin-right: 3rem;
  margin-top: 1.1rem;
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
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('esp')

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value as Language)
  }

  return (
    <div>
      <DropdownLang value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="esp">ES</option>
        <option value="cat">CA</option>
      </DropdownLang>
    </div>
  )
}
