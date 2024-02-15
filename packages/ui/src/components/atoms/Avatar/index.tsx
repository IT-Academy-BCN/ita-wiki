import { FC, HTMLAttributes } from 'react'
import styled, { Interpolation, ThemedStyledProps } from 'styled-components'
import { colors, device } from '../../../styles'
import defaultAvatar from './default.svg'

export type TAvatar = HTMLAttributes<HTMLDivElement> & {
  src?: string
  alt: string
  avatarCss?: Interpolation<ThemedStyledProps<TAvatar, unknown>>
  mediaQuery?: { [key: string]: string; }
  forwardedRef?: React.RefObject<HTMLImageElement>
  onClick?: () => void
}

const StyledAvatar = styled.img<TAvatar>`
 ${props => props.avatarCss};
  object-fit: cover;
  appearance: auto;
  text-align: center;
  cursor: pointer;
  @media only ${device.Tablet} {
    ${(props) => props.mediaQuery}
  }
`
const defaultMediaQuery = {
  width: '118px',
  height: '118px',
  border: 'none',
}
const defaultAvatarCss = {
  width: '97px',
  height: '97px',
  borderRadius: '50%',
  backgroundColor: colors.gray.gray5,
  border: `1px solid ${colors.gray.gray4}`,

}
export const Avatar: FC<TAvatar> = ({
  src = defaultAvatar,
  alt,
  avatarCss = {
    defaultAvatarCss
  },
  forwardedRef,
  mediaQuery = { ...defaultMediaQuery },
  onClick
}) => (
  <StyledAvatar
    src={src}
    alt={alt}
    avatarCss={avatarCss}
    ref={forwardedRef}
    mediaQuery={mediaQuery}
    onClick={onClick}
  />
)
