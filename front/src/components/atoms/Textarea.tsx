import { TextareaHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const TextareaStyled = styled.textarea<TTextarea>`
  width: 100%;
  border: 1px solid ${colors.gray.gray4};
  padding: ${dimensions.spacing.sm};
  border-radius: ${dimensions.borderRadius.base};
`

export type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number
  cols?: number
}

const Textarea = ({ rows = 10, cols = 1, ...rest }: TTextarea) => (
  <TextareaStyled rows={rows} cols={cols} {...rest} />
)

export default Textarea
