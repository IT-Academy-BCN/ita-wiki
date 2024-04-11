import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '@itacademy/ui'
import {
  FiltersWidget,
  Login,
  Navbar,
  SideMenu,
  UsersTable,
} from '../components/organisms'
import { useAuth } from '../context/AuthProvider'

const Container = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.xxs} ${dimensions.spacing.xxxl}
    ${dimensions.spacing.xl} ${dimensions.spacing.sm};
`

const ContainerMain = styled(FlexBox)`
  width: 100%;
  height: 100%;
`

const MainDiv = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  padding: ${dimensions.spacing.lg} ${dimensions.spacing.xxxl};
  border-radius: ${dimensions.borderRadius.base};
  color: ${colors.gray.gray3};
`

const LoginContainer = styled(FlexBox)`
  width: 50%;
  height: auto;
  background-color: ${colors.white};
  padding: ${dimensions.spacing.lg} 6rem;
  border-radius: ${dimensions.borderRadius.sm};
`

export const Home: FC = () => {
  const { user } = useAuth()

  if (!user)
    return (
      <Container
        direction="column"
        align="center"
        justify="flex-start"
        gap={dimensions.spacing.sm}
      >
        <Navbar />
        <LoginContainer>
          <Login />
        </LoginContainer>
      </Container>
    )

  return (
    <Container direction="row" align="center">
      <SideMenu />
      <ContainerMain justify="flex-start">
        <Navbar />
        <MainDiv
          as="main"
          justify="flex-start"
          align="center"
          gap={dimensions.spacing.xxl}
        >
          <FiltersWidget />
          <UsersTable />
        </MainDiv>
      </ContainerMain>
    </Container>
  )
}
