import React from 'react'
import styled from 'styled-components'
import { TIcon } from '../../types'

const IconStyled = styled.span<TIcon>`
  font-variation-settings: 'FILL' ${({ fill }) => fill},
    'wght' ${({ wght }) => wght}, 'GRAD' ${({ grad }) => grad},
    'opsz' ${({ opsz }) => opsz};
  color: ${({ color }) => color};
  cursor: pointer;
`

const Icon: React.FC<TIcon> = ({
  className = '',
  fill = 1,
  wght = 400,
  grad = 0,
  opsz = 48,
  name = '',
  color = '',
  ...rest
}) => (
  <IconStyled
    className={`material-symbols-outlined ${className}`}
    fill={fill}
    wght={wght}
    grad={grad}
    color={color}
    opsz={opsz}
    {...rest}
    name={name}
  >
    {name}
  </IconStyled>
)

export default styled(Icon)``
