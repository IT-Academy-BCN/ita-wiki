import React, { SelectHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const SelectStyled = styled.select<TSelect>`
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
  color: ${colors.gray.gray3};
  font-weight: 500;
  padding: ${dimensions.spacing.sm};
  width: 100%;

  ${({ error }) => error && `border: 1px solid ${colors.error};`}

  &:focus {
    outline: 0 none;
  }
`
type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: { value: string; label: string }[]
  error?: boolean | string
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, TSelect>(
  ({ options = [], error = false, placeholder = 'Options' }, ref) => {
    const [selectedOption, setSelectedOption] = useState<{
      value: string
      label: string
    } | null>(null)

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { value } = event.target
      const option = options.find((op) => op.value === value)
      setSelectedOption(option ?? null)
    }

    return (
      <SelectStyled
        value={selectedOption?.value ?? ''}
        onChange={handleSelectChange}
        error={error}
        ref={ref}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectStyled>
    )
  }
)

export default Select
