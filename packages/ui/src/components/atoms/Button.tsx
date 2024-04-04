import { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean
  outline?: boolean
  size?: 'small' | 'normal' | 'large'
}

const StyledButton = styled('button').withConfig<TButton>({
  shouldForwardProp: (prop) => !['size', 'secondary', 'outline'].includes(prop),
})<TButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${dimensions.borderRadius.base};
  padding: ${({ size }) =>
    (size === 'small' && dimensions.spacing.xxs) ||
    (size === 'large' && dimensions.spacing.md) ||
    dimensions.spacing.base};
  cursor: pointer;
  width: 100%;
  color: ${colors.white};
  border: 2px solid ${colors.primary};
  background-color: ${colors.primary};
  font-family: ${font.fontFamily};
  font-weight: ${font.medium};

  &:hover {
    background-color: ${colors.primaryDark};
    border: 2px solid ${colors.primaryDark};
  }
  &:active {
    background-color: ${colors.primaryLight};
    border: 2px solid ${colors.primaryLight};
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  ${({ secondary }) =>
    secondary &&
    `
        background-color: ${colors.secondary};
        border: 2px solid ${colors.secondary};
        
        &:hover {
            background-color: ${colors.secondaryDark};
            border: 2px solid ${colors.secondaryDark};
        }
        &:active {
            background-color: ${colors.secondaryLight};
            border: 2px solid ${colors.secondaryLight};
        }
        &:disabled {
            opacity: 0.8;
            cursor: not-allowed;
        }
    `}

  ${({ outline }) =>
    outline &&
    `
        font-weight: ${font.bold};
        background-color: ${colors.white};
        color: ${colors.gray.gray2};
        border: 2px solid ${colors.gray.gray4};

        &:hover {
            background-color: ${colors.outlineHover};
        }
        &:active {
            background-color: ${colors.outlineActive};
            border: 2px solid ${colors.primary};
        }
    `}
`

export const Button: FC<TButton> = ({
  type = 'submit',
  secondary = false,
  outline = false,
  size = 'normal',
  children,
  ...rest
}) => (
  <StyledButton
    type={type}
    data-testid="button"
    secondary={secondary}
    outline={outline}
    size={size}
    {...rest}
  >
    {children}
  </StyledButton>
)
