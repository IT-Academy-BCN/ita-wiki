import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const InputStyled = styled.input<TInput>`
  width: 100%;
  padding: ${dimensions.spacing.sm};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};

  ${({ success }) => success && `border: 1px solid ${colors.success};`}
  ${({ warning }) => warning && `border: 1px solid ${colors.warning};`}
  ${({ error }) => error && `border: 1px solid ${colors.error};`}

  &:focus {
    outline: 0 none;
  }
`

export type TInput = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | string
  success?: boolean
  warning?: boolean
  type?: 'text' | 'password' | 'email'
}

const Input = React.forwardRef<HTMLInputElement, TInput>(
  (
    { error = false, warning = false, success = false, type = 'text', ...rest },
    ref
  ) => (
    <InputStyled
      type={type}
      error={!!error}
      success={success}
      warning={warning}
      ref={ref}
      {...rest}
    />
  )
)

export default styled(Input)``
