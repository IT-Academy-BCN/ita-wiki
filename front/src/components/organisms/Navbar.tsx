import { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { FlexBox, colors, device, dimensions } from '../../styles'
import { Button, Icon, Title, HamburgerMenu } from '../atoms'
import { UserButton } from '../molecules/UserButton'
import { SelectLanguage } from '../molecules/SelectLanguage'
import { CategoriesList } from './CategoriesList'
import { Modal } from '../molecules/Modal'
import { SettingsManager } from './SettingsManager'

const NavbarStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  justify-content: end;
  align-items: center;
  height: 5rem;
  width: 100%;
  padding: ${dimensions.spacing.xs} ${dimensions.spacing.none};

  ${Title} {
    color: ${colors.white};
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

const StyledButton = styled(Button)`
  margin: ${dimensions.spacing.none} ${dimensions.spacing.md}
    ${dimensions.spacing.md} ${dimensions.spacing.md};
  width: 90%;
  @media ${device.Tablet} {
    width: 12rem;
  }
`

type TNavbar = {
  toggleModal?: () => void
  handleAccessModal?: () => void
}
export const Navbar = ({ toggleModal, handleAccessModal }: TNavbar) => {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const location = useLocation();
  const shouldRenderIcons = location.pathname !== '/'

  return (
    <>
      <NavbarStyled direction="row" data-testid="navbar">
        <HamburgerMenu
          open={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="hamburger-menu"
        />
        {shouldRenderIcons && (
          <IconStyled
              data-testid="new-post-button"
              onClick={() => {
                if (user) {
                  toggleModal?.();
                } else {
                  handleAccessModal?.();
                }
              }}
              title="Añadir recurso"
              role="button"
            >
              <Icon name="add" color={colors.gray.gray3} />
            </IconStyled>
        )}
        <SelectLanguage />
        <IconStyled
          data-testid="settings-button"
          onClick={() => handleSettingsModal()}
          title="Configuración"
          role="button"
        >
          <Icon name="settings" color={colors.gray.gray3} />
        </IconStyled>
        <UserButton />
        <MenuItems open={isMenuOpen} data-testid="menu-items">
          <CategoriesList />
        </MenuItems>
      </NavbarStyled>
      <Modal
        title="Ajustes"
        isOpen={isSettingsOpen}
        toggleModal={() => setIsSettingsOpen(false)}
      >
        {isSettingsOpen && <SettingsManager />}
        <FlexBox>
          <StyledButton onClick={() => setIsSettingsOpen(false)}>
            Cerrar
          </StyledButton>
        </FlexBox>
      </Modal>
    </>
  )
}

export default styled(Navbar)``
