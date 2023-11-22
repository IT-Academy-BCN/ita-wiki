import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, device } from '../../styles'
import icons from '../../assets/icons'

const StyledUserImage = styled.img<TUserImage>`
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
type TUserImage = HTMLAttributes<HTMLDivElement> & {
  src: string
  alt: string
}

const UserImage: FC<TUserImage> = ({ src, alt }) => (
  <StyledUserImage src={src === '' ? icons.user : src} alt={alt} />
)

export default UserImage
