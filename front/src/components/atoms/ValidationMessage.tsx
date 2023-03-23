import styled from 'styled-components'
import { colors, font } from '../../styles'

type TValidationMessageStyled = {
  color: 'success' | 'error' | 'warning'
}

const ValidationMessageStyled = styled.span<TValidationMessageStyled>`
  ${({ color }) => color === 'success' && `color: ${colors.success};`};
  ${({ color }) => color === 'error' && `color: ${colors.error};`};
  ${({ color }) => color === 'warning' && `color: ${colors.warning};`};
  font-size: ${font.xs};
`

type TValidationMessage = {
  text?: string
  color?: 'success' | 'error' | 'warning'
}

const ValidationMessage = ({
  text = '',
  color = 'success',
}: TValidationMessage) => {
  if (!text) return null
  return <ValidationMessageStyled color={color}>{text}</ValidationMessageStyled>
}

export default styled(ValidationMessage)``
