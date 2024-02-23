import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '@itacademy/ui'
import {
  FiltersWidget,
  Navbar,
  SideMenu,
  UsersTable,
} from '../components/organisms'

const Container = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.none} ${dimensions.spacing.xxxl}
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

export type TStatus = 'pendiente' | 'activo' | 'bloqueado'

export type TUser = {
  name: string
  specialization: string
  status: TStatus
  registrationDate: string
}

const mockUsers: TUser[] = [
  {
    name: 'Ona Sitgar',
    specialization: 'Node',
    status: 'pendiente',
    registrationDate: '05/11/2023',
  },
  {
    name: 'Marc Bofill',
    specialization: 'Node',
    status: 'activo',
    registrationDate: '05/11/2023',
  },
  {
    name: 'Montserrat Capdevila',
    specialization: 'Node',
    status: 'bloqueado',
    registrationDate: '05/11/2023',
  },
]

export const Home: FC = () => (
  <Container direction="row" align="center">
    <SideMenu />
    <ContainerMain justify="flex-start">
      <Navbar />
      <MainDiv as="main" justify="flex-start" align="center" gap="2rem">
        <FiltersWidget />
        <UsersTable users={mockUsers} />
      </MainDiv>
    </ContainerMain>
  </Container>
)
