import styled from 'styled-components'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { CardHome, Modal, InputGroup, CardResource } from '../components/molecules'
import { CategoriesList, Navbar } from '../components/organisms'
import { Title, Text, Icon, Button } from '../components/atoms'
import { paths } from '../constants'
import Register from './Register'
import Login from './Login'
import { useAuth } from '../context/AuthProvider'

type TResource = {
  id: string
  title: string
  createdBy: string
  createdOn: string
  description: string
  img: string
  url: string
  likes: number
}

export const resources: TResource[] = [
  {
    id: 'resourceId1',
    title: 'JavaScript en 45 segundos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Proyecto práctico',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link1',
    likes: 5,
  },
  {
    id: 'resourceId2',
    title: 'REST API de cero a  ninja!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link2',
    likes: 22,
  },
  {
    id: 'resourceId3',
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link3',
    likes: 56,
  },
  {
    id: 'resourceId4',
    title: 'Redux para principiantes!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link4',
    likes: 125,
  },
]

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

const TextDecorationStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  direction: row;
  background-color: ${colors.gray.gray5};
  height: 100vh;
  width: 100%;
  padding: ${dimensions.spacing.sm};
`

const DivStyled = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  border-radius: ${dimensions.borderRadius.base};
`

const LateralDiv = styled.div`
  height: 100%;
`

const TextContainerStyled = styled(FlexBox)`
  height: 100%;
  gap: ${dimensions.spacing.xxs};
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

const SliderContainer = styled.div`
  width: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const cardHomeMobileContent = [
  {
    id: 1,
    indicator: '/ 01',
    icon: `${icons.newFolder}`,
    title: '¿Cómo colaborar en la wiki?',
    subtitle: 'Ten tus recursos bien organizados',
  }
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
    title: 'Vota los recursos',
    subtitle: 'La comunidad decide cuáles son más relevantes',
  },
]

const Home: FC = () => {
  const { user } = useAuth()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const openRegisterModal = () => {
    setIsRegisterOpen(true)
  }

  const openLoginModal = () => {
    setIsLoginOpen(true)
  }

  return (
    <>
    <MobileStyled>
      <MobileContainerStyled align='stretch'>
        <Navbar title='Wiki'/>     
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
        <Title as='h3' fontWeight='bold'>
          Recursos que te gustan
        </Title>
        {
          user ?
            <SliderContainer>
              <FlexBox direction='row' gap='1rem' justify='flex-start'>
              {
                resources.length > 0 ? 
                resources.map(element => (
                  <CardResource 
                    key={element.id}
                    img={element?.img}
                    id={element.createdOn}
                    title={element.title}
                    url={element.url}
                    description={element.description}
                    likes={element.likes}
                    createdBy={element.createdBy}
                    createdOn={element.createdOn}
                  />
                ))
                :
                <Text fontWeight='bold' color={colors.gray.gray3}>
                  No tienes recursos favoritos
                </Text>
              }
              </FlexBox>
            </SliderContainer>
          :
          <Text fontWeight='bold' color={colors.gray.gray3}>
            <TextDecorationStyled onClick={openRegisterModal}>Regístrate</TextDecorationStyled>
            {` o `} 
            <TextDecorationStyled onClick={openLoginModal}>inicia sesión</TextDecorationStyled>
            {` para añadir recursos favoritos`}
          </Text>
        }
        <Title as='h3' fontWeight='bold'>
          Tus recursos
        </Title>
        { 
          user ?
            <SliderContainer>
              <FlexBox direction='row' gap='1rem' justify='flex-start'>
              {
                resources.length > 0 ?
                resources.map(element => (
                  <CardResource 
                    key={element.id}
                    img={element?.img}
                    id={element.createdOn}
                    title={element.title}
                    url={element.url}
                    description={element.description}
                    likes={element.likes}
                    createdBy={element.createdBy}
                    createdOn={element.createdOn}
                  />
                ))
                :
                <Text fontWeight='bold' color={colors.gray.gray3}>
                  No has subido ningún recurso
                </Text>
              }
              </FlexBox>
            </SliderContainer>
          :
          <Text fontWeight='bold' color={colors.gray.gray3}>No has subido ningún recurso</Text>
        }
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
          <Title as="h1">¡Bienvenid@ a la wiki de la IT Academy!</Title>
          { !user &&
            <>
              <Text color={`${colors.gray.gray3}`} fontSize={`${font.xs}`}>
                Regístrate o inicia sesión para añadir recursos favoritos
              </Text>
              <ButtonContainerStyled direction='row'>
                <ButtonStyled outline onClick={openLoginModal}>Entrar</ButtonStyled>
                <ButtonStyled onClick={openRegisterModal}>Registrarme</ButtonStyled>
              </ButtonContainerStyled>
            </>
          }
          <Text color={`${colors.gray.gray3}`} fontSize={`${font.xs}`}>
            Funcionalidades básicas que te ofrece esta plataforma
          </Text>
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
          <TextContainerStyled direction="row">
            <Icon name="info" fill={0} color={`${colors.gray.gray3}`} />
            <Text color={`${colors.gray.gray3}`} fontSize={`${font.xss}`}>
              Para comenzar a visualizar recursos, selecciona una categoría.
              Registro necesario para subir y votar recursos
            </Text>
          </TextContainerStyled>
        </DivStyled>
      </MainContainer>
    </DesktopStyled>
    <Modal
      isOpen={isLoginOpen || isRegisterOpen}
      toggleModal={() => isLoginOpen ? setIsLoginOpen(false) : setIsRegisterOpen(false)}
    >
      {isLoginOpen && <Login />}
      {isRegisterOpen && <Register />}
    </Modal>
    </>
  )
}
export { Home }
