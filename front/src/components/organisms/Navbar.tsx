import { FC} from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthProvider';
import { FlexBox, colors, dimensions } from '../../styles';
import { Title, Icon } from '../atoms';
import defaultAvatar from '../../assets/icons/profile-avatar.svg';
// import Dropdown from '../atoms/Dropdown';

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
`;

const IconStyled = styled(Icon)`
  padding-left: ${dimensions.spacing.base};
  color: ${colors.white};
  position: absolute;
  left: 0;
`;

const AvatarImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  right: ${dimensions.spacing.sm};
  position: absolute;
  background-color: ${colors.gray.gray5};
  cursor: pointer;
`;
export const Navbar: FC<TNavbar> = ({ title }) => {
  const { user } = useAuth();
  return (
    <NavbarStyled direction="row">
      <IconStyled name="arrow_back_ios" />
      <Title as="h2">{title}</Title>
      {user && (
        <AvatarImage src={user.avatar ? user.avatar : defaultAvatar} alt="Avatar"/>
     )}
    </NavbarStyled>
  );
};

export default styled(Navbar)``
