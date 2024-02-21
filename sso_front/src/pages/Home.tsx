import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '@itacademy/ui'
import { FiltersWidget, Navbar, SideMenu } from '../components/organisms'

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

export const Home: FC = () => (
  <Container direction="row" align="center">
    <SideMenu />
    <ContainerMain justify="flex-start">
      <Navbar />
      <MainDiv as="main" justify="flex-start" align="center">
        <FiltersWidget />
      </MainDiv>
    </ContainerMain>
  </Container>
)
