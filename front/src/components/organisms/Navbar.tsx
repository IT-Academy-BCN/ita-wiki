import { FC, useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, device, dimensions } from '../../styles'
import { Icon, Title, HamburgerMenu } from '../atoms'
import { UserButton } from '../molecules/UserButton'
import { SelectLanguage } from '../molecules'
import { CategoriesList } from './CategoriesList'

const NavbarStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  justify-content: end;
  align-items: center;
  padding-right: ${dimensions.spacing.xl};
  height: 5rem;

  ${Title} {
    color: ${colors.white};
  }
  width: 100%;
  @media (max-height: 870px) {
  }
  @media (max-width: 468px) {
    background-color: ${colors.white};
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    position: relative;
  }
`
const IconStyled = styled.div`
  display: none;
  @media ${device.Tablet} {
    margin: 0px 15px 0px 15px;
    padding: 6px;
    width: 3rem;
    height: ${dimensions.spacing.xxl};
    border-radius: 20%;
    background-color: ${colors.white};
    justify-content: center;
    align-items: center;
    cursor: pointer;

    display: flex;
  }
`

const MenuItems = styled(FlexBox)<{ open: boolean }>`
  flex-direction: column;
  background-color: ${colors.white};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  @media (min-width: 769px) {
    display: none;
  }
`

export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <NavbarStyled direction="row" data-testid="navbar">
      <HamburgerMenu
        open={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        data-testid="hamburger-menu"
      />
      <IconStyled data-testid="new-post-button">
        <Icon name="add" color={colors.gray.gray3} />
      </IconStyled>
      <SelectLanguage />
      <IconStyled data-testid="settings-button">
        <Icon name="settings" color={colors.gray.gray3} />
      </IconStyled>
      <UserButton />
      <MenuItems open={isMenuOpen} data-testid="menu-items">
        <CategoriesList />
      </MenuItems>
    </NavbarStyled>
  )
}
export default styled(Navbar)``
