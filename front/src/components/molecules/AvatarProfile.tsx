import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'
import Icon from '../atoms/Icon'
import { Title } from '../atoms'

const StyledAvatar = styled.button<TAvatar>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: 14px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  min-width: 35px;
  min-height: 35px;
  max-width: 35px;
  background-color: ${colors.white};
`

const StyledNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  min-width: 80px;
  min-height: 55px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${colors.black.black3};
`

type TAvatar = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoggedIn: boolean
  image?: string
}

const Avatar: FC<TAvatar> = ({ isLoggedIn, image, ...rest }) => (
  <StyledNavBar>
    <Icon name="arrow_back_ios" color="white" style={{ marginLeft: '15px' }} />
    <Title as="h2" color="white" style={{ position: 'absolute' }}>
      Wiki
    </Title>
    <StyledAvatar
      type="button"
      data-testid="button"
      isLoggedIn={isLoggedIn}
      {...rest}
    >
      {isLoggedIn ? (
        <img
          src={image}
          alt="Avatar"
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      ) : (
        <Icon name="account_circle" />
      )}
    </StyledAvatar>
  </StyledNavBar>
)

export default styled(Avatar)``
