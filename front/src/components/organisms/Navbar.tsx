import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FlexBox, colors, device, dimensions } from '../../styles'
import { Button, Icon, Title, HamburgerMenu } from '../atoms'
import { UserButton } from '../molecules/UserButton'
import { SelectLanguage } from '../molecules/SelectLanguage'
import { CategoriesList } from './CategoriesList'
import { Modal } from '../molecules/Modal'
import { SettingsManager } from './SettingsManager'
import { useAuth } from '../../context/AuthProvider'

const NavbarStyled = styled(FlexBox)<{ isInCategoryPage: boolean }>`
  background-color: ${({ isInCategoryPage }) =>
    isInCategoryPage ? `${colors.gray.gray5}` : `${colors.white}`};
  padding: ${dimensions.spacing.none} 0.5rem;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 4rem;
  gap: 15px;
  position: relative;

  ${Title} {
    color: ${colors.white};
  }

  @media ${device.Tablet} {
    background-color: ${colors.gray.gray5};
    padding: ${dimensions.spacing.base} ${dimensions.spacing.none};
    gap: 15px;
  }
`
const IconStyled = styled.div`
  padding: 6px;
  width: 3rem;
  height: ${dimensions.spacing.xxl};
  border-radius: 20%;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
`

const AddButton = styled(IconStyled)`
  display: none;
  @media ${device.Tablet} {
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
  @media ${device.Tablet} {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { user } = useAuth()
  const { t } = useTranslation()

  const handleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const location = useLocation()
  const shouldRenderIcons = useMemo(() => location.pathname !== '/', [location])

  return (
    <>
      <NavbarStyled
        direction="row"
        data-testid="navbar"
        isInCategoryPage={shouldRenderIcons}
      >
        <HamburgerMenu
          open={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="hamburger-menu"
          aria-label={t('Menú')}
        />
        {shouldRenderIcons && (
          <AddButton
            data-testid="new-post-button"
            onClick={() => {
              if (user) {
                toggleModal?.()
              } else {
                handleAccessModal?.()
              }
            }}
            title={t('Añadir recurso')}
            aria-label={t('Añadir recurso')}
            role="button"
          >
            <Icon name="add" color={colors.gray.gray3} />
          </AddButton>
        )}
        <SelectLanguage />
        {user && user.role !== 'REGISTERED' ? (
          <IconStyled
            data-testid="settings-button"
            onClick={() => handleSettingsModal()}
            title={t('Configuración')}
            aria-label={t('Configuración')}
            role="button"
          >
            <Icon name="settings" color={colors.gray.gray3} />
          </IconStyled>
        ) : null}
        <UserButton />
        <MenuItems open={isMenuOpen} data-testid="menu-items">
          <CategoriesList />
        </MenuItems>
      </NavbarStyled>
      <Modal
        title={t('Ajustes')}
        isOpen={isSettingsOpen}
        toggleModal={() => setIsSettingsOpen(false)}
      >
        {isSettingsOpen && <SettingsManager />}
        <FlexBox>
          <StyledButton onClick={() => setIsSettingsOpen(false)}>
            {t('Cerrar')}
          </StyledButton>
        </FlexBox>
      </Modal>
    </>
  )
}

export default styled(Navbar)``
