import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '@itacademy/ui'
import { Dashboard, Login, Navbar } from '../components/organisms'
import { useAuth } from '../context/AuthProvider'

const Container = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.none} ${dimensions.spacing.md}
    ${dimensions.spacing.xl} ${dimensions.spacing.sm};
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
    <div data-testid="test-home-page">
      <Dashboard />
    </div>
  )
}
