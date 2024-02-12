import styled from 'styled-components'
import { HTMLAttributes } from 'react'
import { colors, font } from '../../styles'

export type TText = HTMLAttributes<HTMLParagraphElement> & {
  fontSize?: string
  fontWeight?: 'normal' | 'bold'
  fontFamily?: string
}

export const Text = styled.p<TText>`
  color: ${({ color }) => color || colors.black.black2};
  font-size: ${({ fontSize }) => fontSize || font.base};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: ${({ fontFamily }) => fontFamily || font.fontFamily};
`
