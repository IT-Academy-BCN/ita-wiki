import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

type TInputTextStyled = {
  error: boolean
}

const InputTextSyled = styled.input<TInputTextStyled>`
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

function InputText({ error = false, type = 'text', ...rest }: TInputText) {
  return <InputTextSyled type={type} error={!!error} {...rest} />
}

export default styled(InputText)``
