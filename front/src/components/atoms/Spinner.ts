import styled, { keyframes } from 'styled-components'
import { colors } from '../../styles'

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

type TSpinner = {
  size: 'small' | 'medium' | 'big'
}

const Spinner = styled.div<TSpinner>`
  height: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '70px') || '133px'};
  width: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '70px') || '133px'};
  border: 10px solid ${colors.outlineHover};
  border-top-color: ${colors.primary};
  border-right-color: ${colors.primary};
  border-radius: 50%;
  animation: ${spinnerAnimation} 1s linear infinite;
`
export { Spinner }
