import { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Modal, colors, dimensions } from '@itacademy/ui'
import { useAuth } from '../../context/AuthProvider'
import icons from '../../assets/icons'
import { Login } from '../organisms/Login'
import { Register } from '../organisms/Register'
import { paths } from '../../constants'

export const UserButton: FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const avatarRef = useRef<HTMLImageElement>(null)

  const avatarCss = {
    padding: '1px',
    height: '40px',
    width: '40px',
    borderRadius: dimensions.borderRadius.sm,
    backgroundColor: colors.white,
    transition: 'transform 0.3s ease',

    '&:hover': {
      transform: 'scale(1.03)',
    },
  }

  const mediaQuery = {
    borderRadius: dimensions.borderRadius.base,
    width: '48px',
  }

  const defaultMediaQuery = {
    ...mediaQuery,
    padding: '8px',
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleProfileAccess = () => {
    navigate(paths.profile)
  }

  return (
    <>
      {!user && (
        <Avatar
          src={icons.user}
          alt="Avatar"
          avatarCss={avatarCss}
          forwardedRef={avatarRef}
          mediaQuery={defaultMediaQuery}
          onClick={handleLoginModal}
        />
      )}
      {user && (
        <Avatar
          src={user.avatarId ? user.avatarId : icons.profileAvatar}
          alt="Avatar authenticated"
          avatarCss={avatarCss}
          forwardedRef={avatarRef}
          mediaQuery={mediaQuery}
          onClick={handleProfileAccess}
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
        {isRegisterOpen && (
          <Register
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
      </Modal>
    </>
  )
}
