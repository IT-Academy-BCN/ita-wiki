import { forwardRef, type TextareaHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'

export type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows: number
  cols?: number
  error?: boolean | string
  success?: boolean
  warning?: boolean
}

const TextareaStyled = styled.textarea.withConfig<TTextarea>({
  shouldForwardProp: (prop) => !['success', 'warning', 'error'].includes(prop),
})`
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

export const Textarea = forwardRef<HTMLTextAreaElement, TTextarea>(
  ({ cols = 1, ...rest }, ref) => (
    <TextareaStyled cols={cols} ref={ref} {...rest} />
  )
)
