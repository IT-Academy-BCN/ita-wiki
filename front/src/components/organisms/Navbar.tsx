import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox } from '../../styles'
import { Title } from '../atoms'
import { useAuth } from '../../context/AuthProvider'

type TNavbar = {
  title: string
}

const NavbarStyled = styled(FlexBox)`
  background-color: black;
  ${Title} {
    color: white;
  }
`

export const Navbar: FC<TNavbar> = ({ title }) => {
  const { user } = useAuth()
  return (
    <NavbarStyled>
      <Title as="h1">{title}</Title>
    </NavbarStyled>
  )
}
