import { type SelectHTMLAttributes, forwardRef, ReactNode } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'

export type TOption = {
  value: string
  label: string
  id?: string
  iconSvg?: string
}

export type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: TOption[]
  $error?: boolean
  placeholder?: string
}

// const CustomOption = styled.option<TOption>`
//   ::before{
//     content: url(${(props) => `${props.iconSvg}`})
//   }
// `

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

  option::before{
    content:'#';
  }
`

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
      {options.map(({ value, label, id, iconSvg }) => (
        <option key={value} value={value} id={id}>
          {label}
        </option>
      ))}
    </SelectStyled>
  )
})
