import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { FlexBox, colors, dimensions } from '../../styles'
import { Title, Icon } from '../atoms'
import defaultAvatar from '../../assets/icons/profile-avatar.svg'
import { paths } from '../../constants'

type TNavbar = {
  title: string
}
type TNavbarStyled = {
  isDropdownOpen: boolean
}

const NavbarStyled = styled(FlexBox)<TNavbarStyled>`
  background-color: ${colors.black.black3};
  border-bottom-left-radius: ${dimensions.borderRadius.sm};
  border-bottom-right-radius: ${dimensions.borderRadius.sm};
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  min-height: 55px;
  ${Title} {
    color: ${colors.white};
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

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

const IconStyled = styled(Icon)`
  padding-left: ${dimensions.spacing.base};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.white};
`

const AvatarImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${colors.gray.gray5};
  cursor: pointer;
  position: absolute;
  right: ${dimensions.spacing.base};
`

const DropdownMenu = styled(FlexBox)`
  position: absolute;
  top: 3.2rem;
  right: ${dimensions.spacing.xs};
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

export const Navbar: FC<TNavbar> = ({ title }) => {
  const { user, setUser } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const navigate = useNavigate()
  const handleLogout = () => {
    setUser(null)
    setIsDropdownOpen(false)
    navigate(paths.home)
  }

  return (
    <NavbarStyled direction="row" isDropdownOpen={isDropdownOpen}>
      <Link to={paths.home}>
        <IconStyled name="arrow_back_ios" />
      </Link>
      <Title as="h2">{title}</Title>
      {user && (
        <AvatarImage
          data-testid="avatarImage"
          src={user.avatar ? user.avatar : defaultAvatar}
          alt="Avatar"
          onClick={handleDropdownClick}
          ref={avatarRef}
        />
      )}
      {isDropdownOpen && (
        <DropdownMenu ref={dropdownRef}>
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
    </NavbarStyled>
  )
}

export default styled(Navbar)``
