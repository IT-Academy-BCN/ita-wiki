import styled, { keyframes } from 'styled-components'
import { colors } from '../../styles'

type TSpinnerStyled = {
  height?: string
  width?: string
  borderWidth?: string
  borderColor?: string
  duration?: number
}

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const SpinnerStyled = styled.div<TSpinnerStyled>`
  height: ${(p) => (p.height ? p.height : '119px')};
  width: ${(p) => (p.width ? p.width : '133px')};
  border: ${(p) => (p.borderWidth ? p.borderWidth : '4px')} solid #d1d5db;
  border-top-color: ${(p) => (p.borderColor ? p.borderColor : colors.info)};
  border-radius: 50%;
  animation: ${spinnerAnimation}
    ${(p) => (p.duration ? `${p.duration}ms` : '800ms')} linear infinite;
`

export const Spinner = ({ ...props }: TSpinnerStyled) => {
  <SpinnerStyled {...props} />
}
