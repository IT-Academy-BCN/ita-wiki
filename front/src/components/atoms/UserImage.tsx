import { FC } from 'react'
import styled from 'styled-components'
import { TUserImage } from '../../types'

const StyledUserImage = styled.img<TUserImage>`
  width: 97px;
  height: 97px;
  border-radius: 50%;
  object-fit: cover;
`

const UserImage: FC<TUserImage> = ({ src, alt }) => (
  <StyledUserImage src={src} alt={alt} />
)

export default UserImage
