import styled from 'styled-components'
import { colors, font } from '../../styles'
import { TText } from '../../types'

const Text = styled.p<TText>`
  color: ${({ color }) => color || colors.black.black2};
  font-size: ${({ fontSize }) => fontSize || font.base};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: ${({ fontFamily }) => fontFamily || font.fontFamily};
`

export default Text
