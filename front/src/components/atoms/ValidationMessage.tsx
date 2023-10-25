import styled from 'styled-components'
import { colors, font } from '../../styles'

type TValidationMessageStyled = {
  color: 'success' | 'error' | 'warning'
}

const ValidationMessageStyled = styled.p<TValidationMessageStyled>`
  ${({ color }) => color === 'success' && `color: ${colors.success};`};
  ${({ color }) => color === 'error' && `color: ${colors.error};`};
  ${({ color }) => color === 'warning' && `color: ${colors.warning};`};
  font-size: ${font.xs};
  font-family: ${font.fontFamily};
`
export type TValidationMessage = {
  text?: string
  color?: 'success' | 'error' | 'warning'
}

const ValidationMessage = ({
  text = '',
  color = 'success',
  ...rest
}: TValidationMessage) => {
  if (!text) return null
  return (
    <ValidationMessageStyled color={color} {...rest}>
      {text}
    </ValidationMessageStyled>
  )
}

export default styled(ValidationMessage)``
