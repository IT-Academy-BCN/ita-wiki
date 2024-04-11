import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '@itacademy/ui'
import { icons } from '../../assets/icons'
import { useAuth } from '../../context/AuthProvider'

const Container = styled(FlexBox)`
  width: 100%;
`

const LogoImage = styled.img`
  max-width: 7.25rem;
  height: auto;
`
const NavbarStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.none};
  width: 100%;
  height: 4rem;
  position: relative;
  color: ${colors.gray.gray3};
`

const NavbarItemContainer = styled(FlexBox)`
  background-color: ${colors.white};
  height: 2.6rem;
  border-radius: ${dimensions.borderRadius.base};
  padding: 0 ${dimensions.spacing.xxs};
`

const UserImage = styled.img`
  max-width: 7.25rem;
  height: auto;
`
export const Navbar: FC = () => {
  const { user } = useAuth()

  return (
    <Container direction="row" justify="space-between">
      {!user && <LogoImage src={icons.itLogo} alt="IT Academy" />}
      <NavbarStyled
        direction="row"
        justify="flex-end"
        align="center"
        gap="15px"
      >
        <NavbarItemContainer>ESP</NavbarItemContainer>
        {user && (
          <NavbarItemContainer>
            <UserImage src={icons.user} alt="User icon" />
          </NavbarItemContainer>
        )}
      </NavbarStyled>
    </Container>
  )
}
