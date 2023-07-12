import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthProvider'
import { FlexBox, colors, dimensions } from '../../styles'
import { Icon } from '../atoms'
import userAvatar from '../../assets/icons/profile-avatar.svg'
import defaultAvatar from '../../assets/icons/user.svg'
import { Login } from '../organisms'
import { Modal } from './Modal'

type TUserIcoStyled = {
  isDropdownOpen: boolean
}

const UserIcoStyled = styled(FlexBox)<TUserIcoStyled>`
  ${({ isDropdownOpen }) =>
    isDropdownOpen &&
    `
    &::before {
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
  `}
`

const AvatarImage = styled.img`
  padding: 6px;  
  width: 3rem;
  height: 2.5rem;
  border-radius: 20%;
  background-color: ${colors.white};
  cursor: pointer;
  right: ${dimensions.spacing.base};
`

const DropdownMenu = styled(FlexBox)`
  position: absolute;
  top: 4.2rem;
  right: 2rem;
  background-color: ${colors.white};
  padding: 0.5rem;
  border-radius: ${dimensions.borderRadius.sm};
  box-shadow: 0 2px 5px ${colors.gray.gray4};
  z-index: 2;
  width: 9rem;
  height: 7rem;
`

const DropdownItem = styled(FlexBox)`
  padding: 0.5rem;
  flex-direction: row;
  font-weight: 500;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.gray.gray5};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.gray.gray4};
    width: 100%;
  }
`
const IconWrapper = styled(FlexBox)`
  margin-left: 2rem;
`

export const UserButton: React.FC = () => {
  const { user } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLImageElement>(null)

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      avatarRef.current &&
      dropdownRef.current &&
      !avatarRef.current.contains(event.target as Node) &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }
  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  const handleLogout = () => {
    // Implement logout functionality
  }

  return (
    <UserIcoStyled isDropdownOpen={isDropdownOpen}>
      {!user && (
        <>
          <AvatarImage
            data-testid="avatarImage"
            src={defaultAvatar}
            alt="Avatar"
            onClick={handleDropdownClick}
            ref={avatarRef}
          />
          {isDropdownOpen && (
            <DropdownMenu data-testid="dropdownMenu" ref={dropdownRef}>
              <DropdownItem>
                <span onClick={handleLoginModal}>Entrar</span>
                <IconWrapper>
                  <Icon name="person" fill={0} />
                </IconWrapper>
              </DropdownItem>
            </DropdownMenu>
          )}
        </>
      )}
      {user && (
        <>
          <AvatarImage
            data-testid="avatarImage"
            src={user.avatar ? user.avatar : userAvatar}
            alt="Avatar"
            onClick={handleDropdownClick}
            ref={avatarRef}
          />
          {isDropdownOpen && (
            <DropdownMenu  data-testid="dropdownMenu" ref={dropdownRef}>
              <DropdownItem>
                {/* <Link to={`${paths.profile}`}> */}
                <span>Perfil</span>
                <IconWrapper>
                  <Icon name="person" fill={0} />
                </IconWrapper>
                {/* </Link> */}
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <span>Salir</span>
                <IconWrapper>
                  <Icon name="logout" />
                </IconWrapper>
              </DropdownItem>
            </DropdownMenu>
          )}
        </>
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
    </UserIcoStyled>
  )
}

export default styled(UserButton)``
