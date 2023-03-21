import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

type TInputTextStyled = {
  error?: boolean | string
  margin?: string
  padding?: string
  borderRadius?: string
}

const InputTextSyled = styled.input<TInputTextStyled>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '3.8rem'};
  margin: ${({ margin }) => margin || dimensions.spacing.lg};
  padding: ${({ padding }) => padding || dimensions.spacing.md};
  border-radius: ${({ borderRadius }) =>
    borderRadius || dimensions.borderRadius.base};
  border: none;

  &:hover {
    border: 1px solid ${colors.gray.gray4};
  }

  &&[data-error='true'] {
    border: 1px solid ${colors.error};
  }

  &:focus {
    outline: 0 none;
    border: 1px solid
      ${({ error }) => (error ? colors.error : colors.gray.gray4)};
  }
`

type TInputText = InputHTMLAttributes<HTMLInputElement> & {
  error: boolean | string
}

function InputText({ error = 'false', ...rest }: TInputText) {
  return (
    <InputTextSyled
      type="text"
      data-error={error ? 'true' : undefined}
      {...rest}
    />
  )
}

export default styled(InputText)``
