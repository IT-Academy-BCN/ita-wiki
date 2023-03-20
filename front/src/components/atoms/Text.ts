import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import font from '../../styles/font'

type TText = HTMLAttributes<HTMLParagraphElement> & {
  fontSize?: string
}

const Text = styled.p<TText>`
  // TODO add color from style
  color: ${({ color }) => color || 'grey'};
  font-size: ${({ fontSize }) => fontSize || font.normal};
  // TODO add font-family
`

export default Text
