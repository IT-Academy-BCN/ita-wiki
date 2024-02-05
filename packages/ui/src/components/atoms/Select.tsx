import { SelectHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'

const SelectStyled = styled.select<TSelect>`
  cursor: pointer;
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid
    ${(props) => (props.$error ? `${colors.error}` : `${colors.gray.gray4}`)};
  color: ${colors.gray.gray3};
  font-family: ${font.fontFamily};
  padding: ${dimensions.spacing.base};
  padding-right: 11rem;
  width: 100%;
  position: relative;

  &:focus {
    outline: 0 none;
  }
`
type TOption = {
  value: string
  label: string
  id?: string
}

type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: TOption[]
  $error?: boolean
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, TSelect>((props, ref) => {
  const {
    options = [],
    $error = false,
    placeholder = '---------',
    defaultValue = '',
    ...rest
  } = props

  return (
    <SelectStyled
      $error={$error}
      ref={ref}
      defaultValue={defaultValue}
      {...rest}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map(({ value, label, id }) => (
        <option key={value} value={id}>
          {label}
        </option>
      ))}
    </SelectStyled>
  )
})
