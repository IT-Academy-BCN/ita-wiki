import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthProvider';
import { FlexBox, colors, dimensions } from '../../styles';
import { Title, Icon } from '../atoms';
import defaultAvatar from '../../assets/icons/profile-avatar.svg';

type TNavbar = {
  title: string;
};

const NavbarStyled = styled(FlexBox)`
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
  position: relative;
`;

const IconStyled = styled(Icon)`
  padding-left: ${dimensions.spacing.base};
  position: absolute;
  left: 0;
  color: ${colors.white};
`;

const AvatarImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${colors.gray.gray5};
  cursor: pointer;
  position: absolute;
  right: ${dimensions.spacing.base};
  
`;

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
`;

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
`;
const IconWrapper = styled(FlexBox)`
  margin-left: 2rem;
`;


export const Navbar: FC<TNavbar> = ({ title }) => {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const handleLogout = () => {
    // Implement logout functionality
  };
  
  return (
    <NavbarStyled direction="row">
      <IconStyled name="arrow_back_ios" />
      <Title as="h2">{title}</Title>
      {user && (
        <AvatarImage 
          src={user.avatar ? user.avatar : defaultAvatar} 
          alt="Avatar"
          onClick={handleDropdownClick} 
        />
      )}
      {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem>
              <span>Perfil</span>
              <IconWrapper>
                <Icon name="person" fill={0} />
              </IconWrapper>
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
  );
};

export default styled(Navbar)``;
