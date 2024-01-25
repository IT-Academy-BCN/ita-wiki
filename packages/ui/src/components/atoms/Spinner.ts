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

const sizes = {
  xsmall: '18px',
  small: '50px',
  medium: '70px',
  big: '133px',
}

type TSpinner = {
  size?: 'xsmall' | 'small' | 'medium' | 'big'
}

const Spinner = styled.div.attrs<TSpinner>((props) => ({
  size: props?.size,
}))<TSpinner>`
  ${({ size }) => `
    height: ${size ? sizes[size] : sizes.medium};
    width: ${size ? sizes[size] : sizes.medium};
    border: ${
      size ? parseInt(sizes[size], 10) / 6 : parseInt(sizes.medium, 10) / 6
    }px solid ${colors.outlineHover};
  `};
  border-top-color: ${colors.primary};
  border-right-color: ${colors.primary};
  border-radius: 50%;
  animation: ${spinnerAnimation} 1s linear infinite;
`
export { Spinner }
