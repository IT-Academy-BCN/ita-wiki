import { LabelHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, font } from '../../styles'

const LabelStyled = styled.label`
  color: ${colors.gray.gray2};
  font-size: ${font.base};
  font-weight: 700;
`

export type TLabel = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
  text: string
  htmlFor: string
  hiddenLabel?: boolean
}

function Label({ htmlFor, text = '', hiddenLabel = true, ...rest }: TLabel) {
  return (
    <LabelStyled htmlFor={htmlFor} hidden={hiddenLabel} {...rest}>
      {text}
    </LabelStyled>
  )
}

export default styled(Label)``
