import React, { TextareaHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const TextareaStyled = styled.textarea<TTextarea>`
  width: 100%;
  border: 1px solid ${colors.gray.gray4};
  padding: ${dimensions.spacing.sm};
  border-radius: ${dimensions.borderRadius.base};
`

export type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows: number
  cols?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TTextarea>(
  ({ cols = 1, ...rest }, ref) => (
    <TextareaStyled cols={cols} ref={ref} {...rest} />
  )
)

export default styled(Textarea)``
