import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  type: string
  children: React.ReactNode
  padding?: string
  margin?: string
  backgroundColor?: string
  color?: string
  width?: string
  border?: string
  backgroundHover?: string
  backgroundActive?: string
}

const StyledButton = styled.button<TButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding || dimensions.spacing.base};
  margin: ${({ margin }) => margin || dimensions.spacing.xxs};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.primary};
  border-radius: ${dimensions.borderRadius.base};
  color: ${({ color }) => color || colors.white};
  width: ${({ width }) => width || '320px'};
  border: ${({ border }) => border || 'none'};
  cursor: pointer;

  &:hover {
    background-color: ${({ backgroundHover }) =>
      backgroundHover || colors.primaryDark};
  }

  &:active {
    background-color: ${({ backgroundActive }) =>
      backgroundActive || colors.primary};
    filter: opacity(0.7);
  }
`

function Button({ type = 'submit', children, ...rest }: TButton) {
  // Sustituir el contenido por el componente Text
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton type={type} data-testid="button" {...rest}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  padding: dimensions.spacing.base,
  margin: dimensions.spacing.xxs,
  backgroundColor: colors.primary,
  color: colors.white,
  width: '320px',
  border: 'none',
  backgroundHover: colors.primaryDark,
  backgroundActive: colors.primary,
}

export default styled(Button)``
