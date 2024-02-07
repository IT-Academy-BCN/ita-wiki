import { forwardRef, type InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'

export type TInput = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | string
  success?: boolean
  warning?: boolean
  type?: 'text' | 'password' | 'email'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputStyled = styled.input.withConfig<TInput>({
  shouldForwardProp: (prop) => !['error', 'success', 'warning'].includes(prop),
})`
  width: 100%;
  padding: ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.base};
  border: 1px solid ${colors.gray.gray4};
  font-family: ${font.fontFamily};
  line-height: 1;

  ${({ success }) => success && `border: 1px solid ${colors.success};`}
  ${({ warning }) => warning && `border: 1px solid ${colors.warning};`}
  ${({ error }) => error && `border: 1px solid ${colors.error};`}

  &:focus {
    outline: 0 none;
  }
`

export const Input = forwardRef<HTMLInputElement, TInput>(
  (
    {
      error = false,
      warning = false,
      success = false,
      type = 'text',
      onChange,
      ...rest
    },
    ref
  ) => (
    <InputStyled
      type={type}
      error={!!error}
      success={success}
      warning={warning}
      onChange={onChange}
      {...rest}
      ref={ref}
    />
  )
)
