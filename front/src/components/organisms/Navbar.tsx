import { useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Title } from '../atoms'
import { LanguageSelector, UserButton } from '../molecules'
import { CategoriesList } from './CategoriesList'
import closeButton from '../../assets/icons/x.svg'
import PlusImg from '../../assets/icons/plus.svg'
import MenuHamburger from '../../assets/icons/menu-left.svg'
import SettingsImg from '../../assets/icons/settings.svg'

const NavbarStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  justify-content: end;
  align-items: center;
  padding-top: 20px;
  padding-right: 2rem;
  min-height: 55px;

  ${Title} {
    color: ${colors.white};
  }

  width: 100%;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0px;
    position: relative;
    top: -30px;
  }
`

const LangDesktop = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`
const HamburgerMenu = styled.img`
  margin-right: 1.5rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`

const ButtonImg = styled.img`
  margin: 0px 15px 0px 15px;
  padding: 6px;
  width: 3rem;
  height: 2.5rem;
  border-radius: 20%;
  background-color: ${colors.white};
  cursor: pointer;
  right: ${dimensions.spacing.base};

  @media (max-width: 768px) {
    display: none;
  }
`

const CloseButton = styled.img`
  width: 3rem;
  height: 2.5rem;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
`
const BgWhite = styled(FlexBox)`
  position: absolute;
  top: -70px;
  right: -20px;
  background-color: ${colors.white};
  z-index: 999;
  width: 100vh;
  height: 100vh;
  @media (min-width: 769px) {
    display: none;
  }
`

const MenuItems = styled(FlexBox)`
  flex-direction: column;
  position: absolute;
  top: -40px;
  right: 0;
  padding: 15px;
  background-color: ${colors.white};
  z-index: 999;
  width: 100%;
  height: 100vh;
  @media (min-width: 769px) {
    display: none;
  }
`


export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <NavbarStyled direction="row">
      <HamburgerMenu src={MenuHamburger} alt="menu" onClick={toggleMenu} />
      <ButtonImg
        data-testid="new-post-button"
        src={PlusImg}
        alt="newPost"
      />
      <LangDesktop>
        <LanguageSelector />
      </LangDesktop>
      <ButtonImg
        data-testid="settings-button"
        src={SettingsImg}
        alt="settings"
      />
      <UserButton />
      {isMenuOpen && (
        <>
          <BgWhite />
          <MenuItems>
            <CloseButton
              data-testid="close-button"
              src={closeButton}
              alt="close"
            />
            <CategoriesList />
          </MenuItems>
        </>
      )}
    </NavbarStyled>
  )
}

export default styled(Navbar)``
