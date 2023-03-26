import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

type TInputTextStyled = {
  error: boolean
}

const InputTextStyled = styled.input<TInputTextStyled>`
  width: '100%';
  padding: ${dimensions.spacing.sm};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${({ error }) => (error ? colors.error : colors.gray.gray4)};

  &:focus {
    outline: 0 none;
  }
`

type TInputText = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | string
  type?: 'text' | 'password' | 'email'
}

const InputText = React.forwardRef<HTMLInputElement, TInputText>(
  ({ error = false, type = 'text', ...rest }, ref) => (
    <InputTextStyled type={type} error={!!error} ref={ref} {...rest} />
  )
)

export default styled(InputText)``
