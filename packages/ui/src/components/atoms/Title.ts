import styled from 'styled-components'
import { HTMLAttributes } from 'react'
import { colors, font } from '../../styles'
import { Text } from './Text'

export type TTitle = HTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Title = styled(Text).attrs<TTitle>((props) => ({
  as: props?.as || 'h1',
}))<TTitle>`
  color: ${({ color }) => color || colors.black.black2};
  font-family: ${font.fontFamily};
  ${({ as }) => as === 'h1' && `font-size: ${font.h1}`};
  ${({ as }) => as === 'h2' && `font-size: ${font.h2}`};
  ${({ as }) => as === 'h3' && `font-size: ${font.h3}`};
  ${({ as }) => as === 'h4' && `font-size: ${font.h4}`};
  ${({ as }) => as === 'h5' && `font-size: ${font.h5}`};
  ${({ as }) => as === 'h6' && `font-size: ${font.h6}`};
`
