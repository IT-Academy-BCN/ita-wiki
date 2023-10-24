import React from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'
import { TInput } from '../../types'

const InputStyled = styled.input<TInput>`
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

const Input = React.forwardRef<HTMLInputElement, TInput>(
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

export default styled(Input)``
