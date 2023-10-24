import React from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'
import { TTextarea } from '../../types'

const TextareaStyled = styled.textarea<TTextarea>`
  width: 100%;
  border: 1px solid ${colors.gray.gray4};
  padding: ${dimensions.spacing.sm};
  border-radius: ${dimensions.borderRadius.base};
  font-family: ${font.fontFamily};

  ${({ success }) => success && `border: 1px solid ${colors.success};`}
  ${({ warning }) => warning && `border: 1px solid ${colors.warning};`}
  ${({ error }) => error && `border: 1px solid ${colors.error};`}

&:focus {
    outline: 0 none;
  }
`

const Textarea = React.forwardRef<HTMLTextAreaElement, TTextarea>(
  ({ cols = 1, ...rest }, ref) => (
    <TextareaStyled cols={cols} ref={ref} {...rest} />
  )
)

export default styled(Textarea)``
