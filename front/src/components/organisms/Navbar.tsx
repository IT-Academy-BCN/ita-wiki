import { useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Title } from '../atoms'
import LanguageSelector from '../molecules/SelectLanguage'
import UserButton from '../molecules/UserButton'
import SettingsImg from '../../assets/icons/settings.svg'
import PlusImg from '../../assets/icons/plus.svg'
import MenuHamburger from '../../assets/icons/menu-left.svg'



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
    position:relative;
    top:-30px;
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
`;

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
const ButtonImgTablet = styled.img`
  margin-bottom:15px;
  padding: 6px;
  width: 3rem;
  height: 2.5rem;
  border-radius: 20%;
  background-color: ${colors.white};
  cursor: pointer;
  right: ${dimensions.spacing.base};
`

const MenuItems = styled(FlexBox)`
flex-direction: column;
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  padding:15px;
  border-radius:12px;
  border: 1px solid ${colors.gray.gray4};
  background-color: ${colors.gray.gray5};
  z-index: 999;
  max-width: 100px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MenuItem = styled(FlexBox)`
  padding: 0.5rem;
  cursor: pointer;
`;

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarStyled direction="row">
      <HamburgerMenu src={MenuHamburger} alt="menu" onClick={toggleMenu} />
      <ButtonImg
        data-testid="newPostImage1"
        src={PlusImg}
        alt="newPost"
        onClick={() => console.log('new post')}
      />
      <LangDesktop>
        <LanguageSelector/>
      </LangDesktop>
      <ButtonImg
        data-testid="settingsImage1"
        src={SettingsImg}
        alt="settings"
        onClick={() => console.log('open settings')}
      />
      <UserButton />
      {isMenuOpen  && (
        <MenuItems>
          <ButtonImgTablet
            data-testid="newPostImage2"
            src={PlusImg}
            alt="newPost"
            onClick={() => console.log('new post')}
          />
          <ButtonImgTablet
            data-testid="settingsImage2"
            src={SettingsImg}
            alt="settings"
            onClick={() => console.log('open settings')}
          />
          <LanguageSelector/>
        </MenuItems>
      )}
    </NavbarStyled>
  )
}

export default styled(Navbar)``
