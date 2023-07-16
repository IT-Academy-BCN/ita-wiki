import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthProvider'
import { FlexBox, colors, dimensions } from '../../styles'
import userAvatar from '../../assets/icons/profile-avatar.svg'
import defaultAvatar from '../../assets/icons/user.svg'
// eslint-disable-next-line import/no-cycle
import { Login } from '../organisms'
import { Modal } from './Modal'

const AvatarImage = styled.img`
  padding: 6px;  
  width: 3rem;
  height: 2.5rem;
  border-radius: 20%;
  background-color: ${colors.white};
  cursor: pointer;
  right: ${dimensions.spacing.base};
`

export const UserButton: React.FC = () => {
  const { user } = useAuth()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const avatarRef = useRef<HTMLImageElement>(null)


  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }
  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }


  return (
    <FlexBox>
      {!user && (
          <AvatarImage
            data-testid="avatarImage"
            src={defaultAvatar}
            alt="Avatar"
            onClick={handleLoginModal}
            ref={avatarRef}
          />  
      )}
      {user && (
          <AvatarImage
            data-testid="avatarImage"
            src={user.avatar ? user.avatar : userAvatar}
            alt="Avatar"
            ref={avatarRef}
          />
      )}
      <Modal
        isOpen={isLoginOpen || isRegisterOpen}
        toggleModal={() =>
          isLoginOpen ? setIsLoginOpen(false) : setIsRegisterOpen(false)
        }
      >
        {isLoginOpen && (
          <Login
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
      </Modal>
    </FlexBox>
  )
}

export default styled(UserButton)``
