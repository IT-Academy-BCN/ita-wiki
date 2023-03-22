/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

// Faltan props para el secondary button
// Faltan para el size
// Faltan para el disabled

const StyledButton = styled.button<TButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${dimensions.spacing.base};
  margin: ${dimensions.spacing.xxs};
  background-color: ${colors.primary};
  border-radius: ${dimensions.borderRadius.base};
  color: ${colors.white};
  width: 100%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primaryDark};
  }

  &:active {
    background-color: ${colors.primary};
    filter: opacity(0.7);
  }
`

type TButton = ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<TButton> = ({ type = 'submit', children, ...rest }) => (
  <StyledButton type={type} data-testid="button" {...rest}>
    {children}
  </StyledButton>
)

export default styled(Button)``
