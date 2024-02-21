import { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Text } from '../atoms'
import { colors, dimensions } from '../../styles'

const ButtonStyled = styled(Button)``

type TTooltipWrapper = { $dottedUnderline?: boolean }

export type TTooltip = {
  btnText?: string
  btnOnClick?: () => void
  children: React.ReactNode
  tooltipTxt: string
} & TTooltipProps &
  TTooltipWrapper

type TTooltipProps = {
  $dottedUnderline?: boolean
  $size: 'small' | 'medium' | 'big'
  $tipPosition: 'top' | 'bottom' | 'left' | 'right'
}

const StyledText = styled(Text)``

const TooltipWrapper = styled.div<TTooltipWrapper>`
  position: relative;
  display: inline-block;
  border-bottom: ${({ $dottedUnderline }) =>
    $dottedUnderline ? `1px dotted ${colors.primary}` : 'none'};
  cursor: pointer;
  padding: 0.05rem;
`

const TooltipStyled = styled.span<TTooltipProps & { $tooltipPosition: number }>`
  position: absolute;
  display: flex;
  flex-direction: ${({ $size }) => ($size === 'big' ? 'column' : 'row')};
  justify-content: ${({ $size }) =>
    $size === 'big' ? 'space-around' : 'center'};
  align-items: center;
  padding: ${dimensions.spacing.xxxs};
  min-width: ${({ $size }) =>
    ($size === 'small' && '135px') ||
    ($size === 'medium' && '82px') ||
    '271px'};
  min-height: ${({ $size }) =>
    ($size === 'small' && '28px') || ($size === 'medium' && '47px') || '119px'};
  border-radius: ${dimensions.borderRadius.base};
  text-align: center;
  background-color: ${colors.black.black3};
  z-index: 2;

  ${StyledText} {
    color: ${colors.white};
    font-size: ${({ $size }) => ($size === 'small' ? '14px' : '16px')};
    font-weight: ${({ $size }) => ($size === 'big' ? '700' : '400')};
    line-height: ${({ $size }) => ($size === 'big' ? '26px' : '20px')};
    padding: 0;
  }

  ${ButtonStyled} {
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
    width: ${({ $size }) => ($size === 'big' ? '28px' : '21px')};
    height: ${({ $size }) => ($size === 'big' ? '28px' : '21px')};
    background-color: ${colors.black.black3};
    border-radius: ${({ $size }) => ($size === 'big' ? '8px' : '4px')};
    transform: rotateZ(45deg);
    z-index: -2;

    ${({ $tipPosition, $size }) =>
      `${$tipPosition}: ${$size === 'big' ? '-8px' : '-4px'};`}
  }

  ${({ $size, $tipPosition, $tooltipPosition }) =>
    $tipPosition === 'top' &&
    ` 
      bottom: ${
        $size === 'big'
          ? `calc(100% - (${$tooltipPosition}px + 36px))`
          : `calc(100% - (${$tooltipPosition}px + 34px))`
      };
      left: 50%;
      transform: translateX(-50%);
   `}

  ${({ $size, $tipPosition }) =>
    $tipPosition === 'right' &&
    `
      right: ${
        $size === 'big' ? 'calc(100% + 0.9rem)' : 'calc(100% + 0.75rem)'
      };         
      top: 50%;
      transform: translateY(-50%);
   `}
   
   ${({ $size, $tipPosition, $tooltipPosition }) =>
    $tipPosition === 'bottom' &&
    `
      top: ${
        $size === 'big'
          ? `calc(100% - (${$tooltipPosition}px + 36px))`
          : `calc(100% - (${$tooltipPosition}px + 34px))`
      };
      left: 50%;
      transform: translateX(-50%);
    `}

   ${({ $size, $tipPosition }) =>
    $tipPosition === 'left' &&
    `
      left: ${$size === 'big' ? 'calc(100% + 0.9rem)' : 'calc(100% + 0.75rem)'};
      top: 50%;
      transform: translateY(-50%);
    `}
`

export const Tooltip: FC<TTooltip> = ({
  btnText,
  btnOnClick,
  children,
  $dottedUnderline = false,
  $size,
  $tipPosition,
  tooltipTxt,
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipHeight, setTooltipHeight] = useState(0)

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.clientHeight
      setTooltipHeight(height)
    }
  }, [showTooltip])

  return (
    <TooltipWrapper
      onMouseOver={() => {
        setShowTooltip(true)
      }}
      onMouseLeave={() => {
        setShowTooltip(false)
      }}
      $dottedUnderline={$dottedUnderline}
    >
      {showTooltip ? (
        <TooltipStyled
          $size={$size}
          $tipPosition={$tipPosition}
          $tooltipPosition={tooltipHeight}
          ref={ref}
          role="tooltip"
        >
          <StyledText>{tooltipTxt}</StyledText>
          {$size === 'big' && btnText && btnOnClick ? (
            <Button secondary size="small" type="button" onClick={btnOnClick}>
              {btnText}
            </Button>
          ) : null}
        </TooltipStyled>
      ) : null}
      {children}
    </TooltipWrapper>
  )
}
