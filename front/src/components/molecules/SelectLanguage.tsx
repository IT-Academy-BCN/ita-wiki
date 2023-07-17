import React, { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../styles'

type Language = 'esp' | 'cat'

const DropdownLang = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 20%;
  font-weight: 500;
  color: ${colors.gray.gray3};

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0 none;
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

