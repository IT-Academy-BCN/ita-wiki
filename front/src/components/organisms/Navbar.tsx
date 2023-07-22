import { useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Title } from '../atoms'
import { SelectLanguage } from '../molecules/SelectLanguage'
import { UserButton } from '../molecules/UserButton'
import { CategoriesList } from './CategoriesList'
import closeButton from '../../assets/icons/x.svg'
import PlusImg from '../../assets/icons/plus.svg'
import MenuHamburger from '../../assets/icons/menu-left.svg'
import SettingsImg from '../../assets/icons/settings.svg'
import { Modal } from '../molecules/Modal'
import { SettingsManager } from './SettingsManager'

const NavbarStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  justify-content: end;
  align-items: center;
  padding-right: 2rem;
  height: 80px;

  ${Title} {
    color: ${colors.white};
  }

  width: 100%;
  @media (max-height: 870px) {
    padding-top: 50px;
    min-height: 120px;
  }
  @media (max-width: 768px) {
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 30px;
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
  height: 115vh;
  @media (min-width: 769px) {
    display: none;
  }
`

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <NavbarStyled direction="row">
        <HamburgerMenu src={MenuHamburger} alt="menu" onClick={toggleMenu} />
        <ButtonImg data-testid="new-post-button" src={PlusImg} alt="newPost" />
        <LangDesktop>
          <SelectLanguage />
        </LangDesktop>
        <ButtonImg
          data-testid="settings-button"
          src={SettingsImg}
          alt="settings"
          onClick={() => handleSettingsModal()}
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
                onClick={toggleMenu}
              />
              <CategoriesList />
            </MenuItems>
          </>
        )}
      </NavbarStyled>
      <Modal
        title="Ajustes"
        isOpen={isSettingsOpen}
        toggleModal={() =>
          isSettingsOpen ? setIsSettingsOpen(false) : setIsSettingsOpen(false)
        }
      >
        {isSettingsOpen && <SettingsManager />}
      </Modal>
    </>
  )
}

export default styled(Navbar)``
