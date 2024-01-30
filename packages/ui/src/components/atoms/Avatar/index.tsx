import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, device } from '../../../styles'
import defaultAvatar from './default.svg'

type TAvatar = HTMLAttributes<HTMLDivElement> & {
  src?: string
  alt: string
}

const StyledAvatar = styled.img<TAvatar>`
  width: 97px;
  height: 97px;
  border-radius: 50%;
  object-fit: cover;
  appearance: auto;
  text-align: center;
  background-color: ${colors.gray.gray5};
  border: 1px solid ${colors.gray.gray4};

  @media only ${device.Tablet} {
    width: 118px;
    height: 118px;
    border: none;
  }
`

export const Avatar: FC<TAvatar> = ({ src = defaultAvatar, alt }) => (
  <StyledAvatar src={src} alt={alt} />
)
