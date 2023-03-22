import { LabelHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, font } from '../../styles'
import Text from './Text'

const LabelStyled = styled(Text)`
  color: ${colors.gray.gray2};
  font-size: ${font.large};
  font-weight: 700;
`

type TLabel = LabelHTMLAttributes<HTMLLabelElement> & {
  text: string
}

function Label({ htmlFor, text = '' }: TLabel) {
  return (
    <LabelStyled as="label" htmlFor={htmlFor}>
      {text}
    </LabelStyled>
  )
}

export { Label }
