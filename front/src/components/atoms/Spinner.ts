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

const Spinner = styled.div`
  height: 133px;
  width: 133px;
  border: 20px solid ${colors.outlineHover};
  border-top-color: ${colors.primary};
  border-right-color: ${colors.primary};
  border-radius: 50%;
  animation: ${spinnerAnimation} 1s linear infinite;
`
export { Spinner }
