import { LabelHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, font } from '../../styles'
import Text from './Text'

const LabelStyled = styled(Text)`
  color: ${colors.gray.gray2};
  font-size: ${font.base};
  font-weight: 700;
`

type TLabel = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
  text: string
  htmlFor: string
}

function Label({ htmlFor, text = '' }: TLabel) {
  return (
    <LabelStyled as="label" htmlFor={htmlFor}>
      {text}
    </LabelStyled>
  )
}

export { Label }
