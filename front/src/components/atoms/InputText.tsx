import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { dimensions } from '../../styles'

type TInputText = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | string
  margin?: string
  padding?: string
  borderRadius?: string
}

const InputTextSyled = styled.input<TInputText>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '3.8rem'};
  margin: ${({ margin }) => margin || dimensions.spacing.lg};
  padding: ${({ padding }) => padding || dimensions.spacing.md};
  border-radius: ${({ borderRadius }) =>
    borderRadius || dimensions.borderRadius.base};
  border: ${dimensions.spacing.none};

  &hover {
    border: 1px solid rgb(150, 150, 150);
  }

  &.error {
    border: 1px solid rgb(235, 87, 87);
  }

  &:focus {
    outline: 0 none;
    border: 1px solid
      ${({ error }) => (error ? 'rgb(235, 87, 87)' : 'rgb(150, 150, 150)')};
  }
`

function InputText({ error, ...rest }: TInputText) {
  return <InputTextSyled type="text" error={error} {...rest} />
}

export default styled(InputText)``
