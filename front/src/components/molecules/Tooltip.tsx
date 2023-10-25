import { FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'
import { Button } from '../atoms'

type TSize = 'small' | 'medium' | 'big'
type TTooltip = {
  children: React.ReactNode
  size: TSize
  tipLeft?: boolean
  tipRight?: boolean
  tipTop?: boolean
  tipBottom?: boolean
  btnText?: string
}
const TooltipStyled = styled.div<TTooltip>`
  position: relative;
  font-size: ${({ size }) => (size === 'small' ? '14px' : '16px')};
  font-weight: ${({ size }) =>
    size === 'small' || size === 'medium' ? '400' : '700'};
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.base};
  min-width: ${({ size }) =>
    (size === 'small' && '143px') || (size === 'medium' && '90px') || '279px'};
  min-height: ${({ size }) =>
    (size === 'small' && '36px') || (size === 'medium' && '55px') || '127px'};
  border-radius: ${dimensions.borderRadius.base};
  text-align: center;
  background-color: ${colors.black.black3};
  color: ${colors.white};
  display: flex;
  flex-direction: ${({ size }) => (size === 'big' ? 'column' : 'row')};
  justify-content: ${({ size }) =>
    size === 'big' ? 'space-around' : 'center'};
  align-items: center;
  z-index: 2;

  ${Button} {
    background-color: ${colors.secondary};
    border: none;
  }

  p {
    margin: 0;
    max-width: 279px;
  }

  &::after {
    content: '';
    position: absolute;
    width: ${({ size }) => (size === 'big' ? '28px' : '21px')};
    height: ${({ size }) => (size === 'big' ? '28px' : '21px')};
    background-color: ${colors.black.black3};
    border-radius: ${({ size }) => (size === 'big' ? '8px' : '4px')};
    transform: rotateZ(45deg);
    z-index: -2;

    ${({ tipLeft, size }) =>
      tipLeft &&
      `
    left: ${size === 'big' ? '-8px' : '-4px'};
    `}
    ${({ tipRight, size }) =>
      tipRight &&
      `
    right: ${size === 'big' ? '-8px' : '-4px'};
    `}
  ${({ tipTop, size }) =>
      tipTop &&
      `
    top:${size === 'big' ? '-8px' : '-4px'};
    
    `}
  
  ${({ tipBottom, size }) =>
      tipBottom &&
      `
    bottom: ${size === 'big' ? '-8px' : '-4px'};
    `}
  }
`

export const Tooltip: FC<TTooltip> = ({
  children,
  size,
  tipLeft,
  tipRight,
  tipTop,
  tipBottom,
  btnText = 'Learn More',
}) => {
  if (size === 'big') {
    return (
      <TooltipStyled
        size={size}
        tipLeft={tipLeft}
        tipRight={tipRight}
        tipTop={tipTop}
        tipBottom={tipBottom}
        role="tooltip"
      >
        <p>{children}</p>
        <Button size="small" type="button">
          {btnText}
        </Button>
      </TooltipStyled>
    )
  }

  return (
    <TooltipStyled
      size={size}
      tipLeft={tipLeft}
      tipRight={tipRight}
      tipTop={tipTop}
      tipBottom={tipBottom}
      role="tooltip"
    >
      {children}
    </TooltipStyled>
  )
}
