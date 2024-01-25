import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, device } from '../../styles'
import Icons from '../../assets/icons'

const StyledUserAvatar = styled.img<TUserAvatar>`
  width: 97px;
  height: 97px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.gray.gray5};
  border: 1px solid ${colors.gray.gray4};

  @media only ${device.Tablet} {
    width: 118px;
    height: 118px;
    border: none;
  }
`
export type TUserAvatar = HTMLAttributes<HTMLDivElement> & {
  src: string
  alt: string
}

const UserAvatar: FC<TUserAvatar> = ({ src, alt }) => (
  <StyledUserAvatar src={src === '' ? Icons.noAvatarImage : src} alt={alt} />
)

export default UserAvatar
