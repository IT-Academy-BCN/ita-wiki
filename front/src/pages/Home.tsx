import styled from 'styled-components'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { CardHome, Modal } from '../components/molecules'
import { CategoriesList, Navbar } from '../components/organisms'
import { Title, Text, Button } from '../components/atoms'
import { paths } from '../constants'
import Register from '../components/organisms/Register'
import Login from '../components/organisms/Login'
import { useAuth } from '../context/AuthProvider'

const Container = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;

  @media only ${device.Tablet} {
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.gray.gray5};
    padding: ${dimensions.spacing.none} ${dimensions.spacing.md}
      ${dimensions.spacing.xl} ${dimensions.spacing.sm};
  }
`

const LateralMenu = styled(FlexBox)`
  display: none;

  @media only ${device.Tablet} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: ${dimensions.spacing.lg};
  }
`

const ContainerMain = styled(FlexBox)`
  width: 100%;
  height: 100%;
`

const MenuOptions = styled(FlexBox)`
  height: 41px;

  @media only ${device.Tablet} {
    margin: ${dimensions.spacing.xxs};
    align-self: flex-end;
    justify-content: center;
  }
`

const MainDiv = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  padding: ${dimensions.spacing.md};
  text-align: center;

  @media only ${device.Tablet} {
    justify-content: center;
    padding: ${dimensions.spacing.xs};
    border-radius: ${dimensions.borderRadius.base};
  }
`

const MainContent = styled(FlexBox)`
  @media only ${device.Tablet} {
    justify-content: flex-start;
    padding: ${dimensions.spacing.xs};
    border-radius: ${dimensions.borderRadius.base};
    overflow: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`

const LogoImage = styled.img`
  max-width: 79px;
  height: auto;
  margin-left: ${dimensions.spacing.xxxs};
`

const StyledTitle = styled(Title)`
  margin-top: ${dimensions.spacing.xs};
  font-size: 35px;
`

const StyledText = styled(Text)`
  margin: ${dimensions.spacing.sm} ${dimensions.spacing.none}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.none};
  line-height: 1.3rem;
  font-weight: ${font.regular};
`

const ButtonContainerStyled = styled(FlexBox)`
  margin: ${dimensions.spacing.xxs} ${dimensions.spacing.none}
    ${dimensions.spacing.xxl} ${dimensions.spacing.none};
  width: 100%;

  @media only ${device.Tablet} {
    flex-direction: row;
  }
`
const ButtonStyled = styled(Button)`
  height: 62px;
  min-width: 50%;
  margin: ${dimensions.spacing.xxxs} ${dimensions.spacing.xs};
`

const ResponsiveFlexBox = styled(FlexBox)`
  align-items: flex-start;
  margin-top: ${dimensions.spacing.md};
  margin-bottom: ${dimensions.spacing.xs};

  @media only ${device.Tablet} {
    flex-direction: row;
    justify-content: space-around;
    gap: 1rem;
  }

  @media only ${device.Desktop} {
    gap: 2rem;
  }
`

const cardHomeContent = [
  {
    id: 1,
    indicator: '/ 01',
    icon: `${icons.newFolder}`,
    title: 'Guarda tus recursos favoritos',
    subtitle: 'Ten tus recursos bien organizados',
  },
  {
    id: 2,
    indicator: '/ 02',
    icon: `${icons.puzzleDynamic}`,
    title: 'Colabora con tus compañer@s',
    subtitle: 'Recursos compartidos',
  },
  {
    id: 3,
    indicator: '/ 03',
    icon: `${icons.thumbUp}`,
    title: `Vota los\nrecursos`,
    subtitle: 'La comunidad decide cuáles son más relevantes',
  },
]

const Home: FC = () => {
  const { user } = useAuth()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <>
      <Container direction="row" justify="flex-start" align="start">
        <LateralMenu>
          <Link to={paths.home}>
            <LogoImage src={icons.itLogo} alt="logo" />
          </Link>
          <CategoriesList />
          <div style={{ height: '79px' }} />
        </LateralMenu>
        <ContainerMain>
          <Navbar />
          <MainDiv
            as="main"
            justify="flex-start"
            align="center"
            color={`${colors.gray.gray3}`}
          >
            <MainContent>
              <StyledTitle as="h1" fontWeight="bold">
                ¡Bienvenid@ a la wiki de la IT Academy!
              </StyledTitle>
              {!user && (
                <FlexBox>
                  <StyledText
                    color={`${colors.gray.gray3}`}
                    fontSize={`${font.base}`}
                  >
                    Regístrate o inicia sesión para poder subir y votar recursos
                  </StyledText>
                  <ButtonContainerStyled direction="column">
                    <ButtonStyled outline onClick={handleLoginModal}>
                      Entrar
                    </ButtonStyled>
                    <ButtonStyled onClick={handleRegisterModal}>
                      Registrarme
                    </ButtonStyled>
                  </ButtonContainerStyled>
                </FlexBox>
              )}
              <FlexBox>
                <StyledText
                  color={`${colors.gray.gray3}`}
                  fontSize={`${font.base}`}
                >
                  Funcionalidades básicas que te ofrece esta plataforma:
                </StyledText>
                <ResponsiveFlexBox direction="column" gap="1rem">
                  {cardHomeContent.map((content) => (
                    <CardHome
                      key={content.id}
                      cardTitle={content.title}
                      cardSubtitle={content.subtitle}
                      indicator={content.indicator}
                      icon={content.icon}
                      data-testid="cardHome"
                    />
                  ))}
                </ResponsiveFlexBox>
              </FlexBox>
            </MainContent>
          </MainDiv>
        </ContainerMain>
      </Container>
      <Modal
        isOpen={isLoginOpen || isRegisterOpen}
        toggleModal={() =>
          isLoginOpen ? setIsLoginOpen(false) : setIsRegisterOpen(false)
        }
      >
        {isLoginOpen && (
          <Login
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
        {isRegisterOpen && (
          <Register
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
      </Modal>
    </>
  )
}

export { Home }