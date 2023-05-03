import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { colors, dimensions } from '../../styles';
import Icon from '../atoms/Icon';

const StyledAvatar = styled.button<TAvatar>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  min-width: 35px;
  min-height: 35px;
  background-color: ${({ isLoggedIn }) => (isLoggedIn ? colors.secondary : colors.gray1)};
`;

type TAvatar = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoggedIn: boolean;
  image?: string; // Agregar la prop "image" de tipo string para la URL de la imagen
};

const Avatar: FC<TAvatar> = ({ type = 'submit', isLoggedIn, image, ...rest }) => (
  <StyledAvatar type={type} data-testid="button" isLoggedIn={isLoggedIn} {...rest}>
    {isLoggedIn ? (
      <img src={image} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
    ) : (
      <Icon name="account_circle" />
    )}
  </StyledAvatar>
);

export default styled(Avatar)``;
