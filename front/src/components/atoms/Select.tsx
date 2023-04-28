import { SelectHTMLAttributes, forwardRef } from 'react'
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

type TOption = {
  value: string
  label: string
}

type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: TOption[]
  error?: boolean | string
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, TSelect>(
  ({ options = [], error = false, placeholder = 'Options', ...rest }, ref) => (
    <SelectStyled error={error} ref={ref} defaultValue={placeholder} {...rest}>
      <option disabled>{placeholder}</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </SelectStyled>
  )
)

export { Select, type TSelect }
