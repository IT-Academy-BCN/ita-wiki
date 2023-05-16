import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox , colors} from '../../styles'
import { Title } from '../atoms'
import { useAuth } from '../../context/AuthProvider'

type TNavbar = {
  title: string
}

const NavbarStyled = styled(FlexBox)`
  background-color: ${colors.black.black3};
  ${Title} {
    color: ${colors.white}
  }
`

export const Navbar: FC<TNavbar> = ({ title }) => {
  const { user } = useAuth()
  return (
    <NavbarStyled>
      <Title as="h1">{title}</Title>
    </NavbarStyled>
  )
};

export default styled(Navbar)``
