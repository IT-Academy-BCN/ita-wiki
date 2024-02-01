import { SelectHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'

const SelectStyled = styled.select<TSelect>`
  /* appearance: none;
  -webkit-appearance: none; */
  cursor: pointer;
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
  color: ${colors.gray.gray3};
  font-family: ${font.fontFamily};
  padding: ${dimensions.spacing.base};
  padding-right: 11rem;
  width: 100%;
  position: relative;

  /* reset */
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  ${({ error }) => error && `border: 1px solid ${colors.error};`}

  &:after {
    /* font-family: 'Material Symbols Outlined';
    content: '\\e5ca'; */
    content: 'hjj';
    font-size: 24px;
    color: tomato;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  &:focus {
    outline: 0 none;
  }

  > option {
    padding: 0.8rem 0;
    height: 1.2rem;
    /* background-color: yellow; */
    border: 1px solid tomato;
  }

  > option:hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }

  > option:focus {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`
type TOption = {
  value: string
  label: string
  id?: string
}

type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: TOption[]
  error?: boolean | string
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, TSelect>((props, ref) => {
  const {
    options = [],
    error = false,
    placeholder = ' --------- ',
    defaultValue = '',
    ...rest
  } = props

  return (
    <SelectStyled error={error} ref={ref} defaultValue={defaultValue} {...rest}>
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
