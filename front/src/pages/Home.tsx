import styled from 'styled-components'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { CardHome, Modal, InputGroup } from '../components/molecules'
import {
  CategoriesList,
  MyFavoritesList,
  MyResources,
  Navbar,
} from '../components/organisms'
import { Title, Text, Button } from '../components/atoms'
import { paths } from '../constants'
import Register from '../components/organisms/Register'
import Login from '../components/organisms/Login'
import { useAuth } from '../context/AuthProvider'

export const MobileStyled = styled.div`
  display: block;
  @media only ${device.Tablet} {
    display: none;
  }
`

export const DesktopStyled = styled.div`
  display: none;
  @media only ${device.Tablet} {
    display: block;
  }
`
const MobileContainerStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  padding: 5rem ${dimensions.spacing.base} ${dimensions.spacing.xl};
`

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  direction: row;
  background-color: ${colors.gray.gray5};
  height: 100vh;
  width: 100%;
  padding: ${dimensions.spacing.xl};
`

const DivStyled = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  border-radius: ${dimensions.borderRadius.base};
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

const LateralDiv = styled.div`
  height: 100%;
`

const ImageStyled = styled.img`
  margin-bottom: ${dimensions.spacing.xl};
  margin-left: ${dimensions.spacing.xl};
  max-width: 79px;
  height: auto;
`

const ButtonStyled = styled(Button)`
  min-width: 50%;
  margin: ${dimensions.spacing.xxs};
  padding: ${dimensions.spacing.xs} ${dimensions.spacing.xxl};
`

const ButtonContainerStyled = styled(FlexBox)`
  margin-bottom: ${dimensions.spacing.xs};
`


const StyledText = styled(Text)`
  margin-top: ${dimensions.spacing.xxl};
`

const cardHomeMobileContent = [
  {
    id: 1,
    indicator: '/ 01',
    icon: `${icons.newFolder}`,
    title: '¿Cómo colaborar en la wiki?',
    subtitle: 'Ten tus recursos bien organizados',
  },
]

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
      <MobileStyled>
        <MobileContainerStyled align="stretch">
          <Navbar title="Wiki" />
          {cardHomeMobileContent.map((content) => (
            <CardHome
              key={content.id}
              cardTitle={content.title}
              cardSubtitle={content.subtitle}
              indicator={content.indicator}
              icon={content.icon}
              data-testid="cardHome"
            />
          ))}
          <InputGroup
            data-testid="inputGroupSearch"
            label="searchHome"
            name="searchHome"
            placeholder="¿Buscas un tema concreto?"
            id="searchHome"
            icon="search"
          />
          <CategoriesList />
          <MyFavoritesList />
          <MyResources />
        </MobileContainerStyled>
      </MobileStyled>
      <DesktopStyled>
        <MainContainer>
          <LateralDiv>
            <Link to={paths.home}>
              <ImageStyled src={icons.itLogo} alt="logo" />
            </Link>
            <CategoriesList />
          </LateralDiv>
          <DivStyled>
            <Title as="h1" fontWeight="bold">
              ¡Bienvenid@ a la wiki de la IT Academy!
            </Title>
            {!user && (
              <>
                <Text color={`${colors.gray.gray3}`} fontSize={`${font.xs}`}>
                  Regístrate o inicia sesión para poder subir y votar recursos
                </Text>
                <ButtonContainerStyled direction="row">
                  <ButtonStyled outline onClick={handleLoginModal}>
                    Entrar
                  </ButtonStyled>
                  <ButtonStyled onClick={handleRegisterModal}>
                    Registrarme
                  </ButtonStyled>
                </ButtonContainerStyled>
              </>
            )}
            <StyledText color={`${colors.gray.gray3}`} fontSize={`${font.xs}`}>
              Funcionalidades básicas que te ofrece esta plataforma:
            </StyledText>
            <FlexBox direction="row">
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
            </FlexBox>
          </DivStyled>
        </MainContainer>
      </DesktopStyled>
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
