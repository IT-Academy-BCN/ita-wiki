/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  type: string
  children: React.ReactNode
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
  padding: ${dimensions.spacing.base};
  margin: ${dimensions.spacing.xxs};
  background-color: ${colors.primary};
  border-radius: ${dimensions.borderRadius.base};
  color: ${colors.white};
  width: 320px;
  border: 'none';
  cursor: pointer;

  &:hover {
    background-color: ${colors.primaryDark};
  }

  &:active {
    background-color: ${colors.primary};
    filter: opacity(0.7);
  }
`

function Button({ type = 'submit', children, ...rest }: TButton) {
  // Sustituir el contenido por el componente Text
  return (
    <StyledButton type={type} data-testid="button" {...rest}>
      {children}
    </StyledButton>
  )
}

export default styled(Button)``
