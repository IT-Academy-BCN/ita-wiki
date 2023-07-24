import { HTMLAttributes, FC } from 'react'
import styled from 'styled-components'

const StyledUserImage = styled.img<TUserImage>`
  width: 97px;
  height: 97px;
  border-radius: 50%;
  object-fit: cover;
`

type TUserImage = HTMLAttributes<HTMLDivElement> & {
  src: string,
  alt: string
}

const UserImage: FC<TUserImage> = ({ 
  src, 
  alt
}) => (
  <StyledUserImage src={ src } alt={ alt } />
)

export default UserImage