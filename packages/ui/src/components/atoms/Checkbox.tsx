import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions, FlexBox } from '../../styles'
import Label from './Label'

export type TCheckbox = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hiddenLabel?: boolean
  defaultChecked?: boolean
  required?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const CheckBoxWrapper = styled(FlexBox)`
  flex-direction: row;

  > input {
    -webkit-appearance: none;
    appearance: none;
    width: ${dimensions.spacing.md};
    height: ${dimensions.spacing.md};
    border-radius: ${dimensions.borderRadius.xs};
    border: 2px solid ${colors.gray.gray3};
    cursor: pointer;

    &:checked {
      background-color: ${colors.primary};
      border: 2px solid ${colors.primary};
    }

    &:checked::before {
      font-family: 'Material Symbols Outlined';
      content: '\\e5ca';
      font-size: 24px;
      color: white;
      position: relative;
      top: -4px;
      left: -2px;
    }

    &:disabled {
      border: 2px solid ${colors.gray.gray4};
      cursor: not-allowed;
    }
  }

  > label {
    font-weight: 500;
    color: ${colors.gray.gray2};
    cursor: pointer;
  }

  > input:checked + label {
    font-weight: 600;
    color: ${colors.gray.gray1};
  }

  > input:disabled + label {
    color: ${colors.gray.gray4};
    cursor: not-allowed;
  }
`

const Checkbox = React.forwardRef<HTMLInputElement, TCheckbox>(
  (
    {
      id,
      label = '',
      hiddenLabel,
      defaultChecked = false,
      required = false,
      className,
      onChange,
      disabled = false,
      ...rest
    },
    ref
  ) => (
    <CheckBoxWrapper
      className={className}
      justify="flex-start"
      gap={`${dimensions.spacing.xxxs}`}
    >
      <input
        type="checkbox"
        ref={ref}
        id={id}
        name={id}
        defaultChecked={defaultChecked}
        required={required}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <Label htmlFor={id} text={label} hidden={hiddenLabel} />
    </CheckBoxWrapper>
  )
)
export default Checkbox
