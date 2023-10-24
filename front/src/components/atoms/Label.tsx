import styled from 'styled-components'
import { colors, font } from '../../styles'
import { TLabel } from '../../types'

const LabelStyled = styled.label`
  color: ${colors.gray.gray2};
  font-size: ${font.xs};
  font-weight: 700;
  font-family: ${font.fontFamily};
`

function Label({ htmlFor, text = '', hiddenLabel = true, ...rest }: TLabel) {
  return (
    <LabelStyled htmlFor={htmlFor} hidden={hiddenLabel} {...rest}>
      {text}
    </LabelStyled>
  )
}

export default styled(Label)``
