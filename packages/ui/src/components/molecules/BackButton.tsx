import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Icon } from '../atoms/Icon'
import { font, device, dimensions } from '../../styles'

const ButtonStyled = styled.button`
  font-weight: ${font.medium};
  display: flex;
  align-items: center;
  position: absolute;
  top: ${dimensions.spacing.base};
  left: ${dimensions.spacing.xxxs};
  border: none;
  background-color: transparent;

  @media only ${device.Tablet} {
    cursor: pointer;
    position: static;
    top: 0;
    left: 0;
  }

  &:hover {
    opacity: 0.7;
  }
`

type TButton = Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  onClick: () => void
}

export const BackButton: FC<TButton> = ({ children, ...rest }) => (
  <ButtonStyled {...rest}>
    <Icon
      name="arrow_back_ios"
      $wght={700}
      style={{ fontSize: `${font.base}` }}
    />

    {children}
  </ButtonStyled>
)
