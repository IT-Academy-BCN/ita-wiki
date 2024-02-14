import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { dimensions, colors, device } from '../../../styles'
import defaultAvatar from './default.svg'

export type TAvatar = HTMLAttributes<HTMLDivElement> & {
  onClick: () => void
  src?: string
  alt: string
  forwardedRef?: React.RefObject<HTMLImageElement>
  width: number
  height: number
  borderRadius: number | string
}

const StyledAvatar = styled.img`
  padding: 1px;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  border: 1px solid ${colors.gray.gray4};
  background-color: ${colors.white};
  cursor: pointer;
  object-fit: cover;
  appearance: auto;
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: scale(1.03);
  }

  @media only ${device.Tablet} {
    border-radius: ${dimensions.borderRadius.base};
    width: 48px;
  }
`
export const Avatar: FC<TAvatar> = ({ src = defaultAvatar, alt, onClick, forwardedRef, width = 50, height = 50, borderRadius = 50 }) => (
  <StyledAvatar src={src} alt={alt} onClick={onClick} ref={forwardedRef} width={width} height={height}
    style={dimensions ? { borderRadius: `${borderRadius}px` } : {}} />
)
