import React from 'react'
import styled from 'styled-components'

// interface IconStyledProps extends TIcon {
//   $wght: number
//   $grad: number
//   $opsz: number
// }

const IconStyled = styled.span<TIcon>`
  font-variation-settings: 'FILL' ${({ fill }) => fill},
    'wght' ${({ $wght }) => $wght}, 'GRAD' ${({ $grad }) => $grad},
    'opsz' ${({ $opsz }) => $opsz};
  color: ${({ color }) => color};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`
export type TIcon = React.HTMLAttributes<HTMLSpanElement> & {
  name: string
  fill?: number
  $wght?: number
  $grad?: number
  $opsz?: number
  className?: string
  color?: string
  cursor?: string
  isFavorite?: boolean,
  onClick?: () => void
}

export const Icon: React.FC<TIcon> = ({
  className = '',
  $wght = 400,
  $grad = 0,
  $opsz = 48,
  name = '',
  color = '',
  isFavorite ,
  fill = isFavorite ? 1 : 0,
  onClick = () => { },
  ...rest
}) => (
  <IconStyled
    className={`material-symbols-outlined ${className}`}
    fill={fill}
    $wght={$wght}
    $grad={$grad}
    color={color}
    $opsz={$opsz}
    name={name}
    onClick={onClick}
    isFavorite={isFavorite}
    {...rest}
  >
    {name}
  </IconStyled>
)
