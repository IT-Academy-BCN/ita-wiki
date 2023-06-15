import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/AuthProvider'
import { FlexBox, colors, dimensions } from '../styles'
import { Button, Text, Title } from '../components/atoms/index'
import { Modal, SelectGroup, CardResource } from '../components/molecules/index'
import { ResourceForm, Navbar } from '../components/organisms/index'
import icons from '../assets/icons'

type TStackData = {
  createdBy: string
  createdOn: string
  description: string
  id: string
  img: string
  likes: number
  stack: string
  title: string
  topic: string
  type: {
    blog: boolean
    tutorial: boolean
    video: boolean
  }
  url: string
}

const stackData: TStackData[] = [
  {
    createdBy: 'Ona Costa',
    createdOn: '2022-08-09T09:42:25.717Z',
    description: 'Teoría con ejemplos',
    id: 'react-1',
    img: icons.profileAvatar,
    likes: 201,
    stack: 'react',
    title: 'Context en 20 minutos',
    topic: 'Context',
    type: {
      blog: false,
      tutorial: false,
      video: true,
    },
    url: 'https://www.youtube.com/watch?v=gigKP6PPmW0',
  },
  {
    createdBy: 'Xavier Soler',
    createdOn: '2022-09-10T08:42:25.717Z',
    description: 'Teoría con ejemplos',
    id: 'react-2',
    img: icons.profileAvatar,
    likes: 132,
    stack: 'react',
    title: 'Redux para principiantes',
    topic: 'Redux',
    type: {
      blog: false,
      tutorial: false,
      video: true,
    },
    url: 'https://www.youtube.com/watch?v=j-jzI3wkkVk',
  },
  {
    createdBy: 'Ona Costa',
    createdOn: '2022-08-11T09:42:25.717Z',
    description: 'Teoría con ejemplos',
    id: 'react-3',
    img: icons.profileAvatar,
    likes: 92,
    stack: 'react',
    title: 'Context en 20 minutos',
    topic: 'Context',
    type: {
      blog: false,
      tutorial: false,
      video: true,
    },
    url: 'https://www.youtube.com/watch?v=gigKP6PPmW0',
  },
  {
    createdBy: 'Ona Costa',
    createdOn: '2022-07-25T09:42:25.717Z',
    description: 'Teoría con ejemplos',
    id: 'react-4',
    img: icons.profileAvatar,
    likes: 75,
    stack: 'react',
    title: 'Context en 20 minutos',
    topic: 'Context',
    type: {
      blog: false,
      tutorial: false,
      video: true,
    },
    url: 'https://www.youtube.com/watch?v=gigKP6PPmW0',
  },
]

const options = [
  {
    value: 'cli04v2l0000008mq5pwx7w5j',
    label: 'Listas',
    slug: 'listas',
    categoryId: 'clh78rhsk000008l0ahamgoug',
  },
]

const HeaderContainerStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  padding: 5rem ${dimensions.spacing.base} ${dimensions.spacing.xl};
  ${SelectGroup} {
    border-radius: ${dimensions.borderRadius.sm};
    color: ${colors.black.black1};
    font-weight: 700;
  }
`
const ButtonAddStyled = styled(Button)`
  border-radius: 50%;
  font-size: xx-large;
  font-weight: 400;
  height: 52px;
  padding-top: 0.6rem;
  width: 52px;
`

const ButtonStyled = styled(Button)`
  font-weight: 500;
  margin: ${dimensions.spacing.xxxs} ${dimensions.spacing.xl};
  color: ${colors.white};
`
const ButtonOutlineStyled = styled(Button)`
  font-weight: 500;
  margin: ${dimensions.spacing.xxxs} ${dimensions.spacing.xl};
  color: ${colors.gray.gray3};
`

const ButtonContainterStyled = styled(FlexBox)`
  margin-top: 0.8rem;

  ${Button} {
    background-color: ${colors.white};
    border-radius: ${dimensions.borderRadius.sm};
    border: none;
    color: ${colors.gray.gray3};
    font-weight: 500;
    padding: ${dimensions.spacing.xs} ${dimensions.spacing.base};
    width: fit-content;

    &:hover {
      background-color: ${colors.primary};
      border: none;
      color: ${colors.white};
    }
  }
`

const SubHeaderContainerStyled = styled(FlexBox)`
  padding: ${dimensions.spacing.base};
`

const TextContainerStyled = styled(FlexBox)`
  gap: 0.8rem;
`

const ImgStyled = styled.img`
  margin-top: ${dimensions.spacing.xxl};
  height: 100px;
  width: 100px;
`

const StyledText = styled(Text)`
  text-align: center;
  padding: 0 ${dimensions.spacing.xs};
  font-weight: 500;
`

const Resource: FC = () => {
  const { slug } = useParams()
  const { user } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const [signupModal, setSignupModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)

  return (
    <>
      <HeaderContainerStyled align="stretch">
        <Navbar title="Wiki" />
        <FlexBox direction="row" justify="space-between">
          <Title as="h1" fontWeight="bold">
            Recursos de {slug}
          </Title>
          <ButtonAddStyled onClick={openModal}>+</ButtonAddStyled>

          {/* TODO: MOVE MODALS TO SEPARATE ORGANISMS */}
          {user ? (
            // ADD RESOURCE MODAL
            <Modal
              isOpen={isOpen}
              toggleModal={() => setIsOpen(false)}
              title="Nuevo Recurso"
            >
              <ResourceForm slug={slug} />
              <ButtonOutlineStyled outline onClick={() => setIsOpen(false)}>
                Cancelar
              </ButtonOutlineStyled>
            </Modal>
          ) : (
            // ACCESS RESTRICTED MODAL
            <Modal isOpen={isOpen} toggleModal={() => setIsOpen(false)}>
              <ImgStyled src={icons.lockDynamic} />
              <Title as="h1" fontWeight="bold">
                Acceso restringido
              </Title>
              <StyledText>Regístrate para subir o votar contenido</StyledText>

              <ButtonStyled
                onClick={() => {
                  setSignupModal(true)
                  setIsOpen(false)
                }}
              >
                Registrarme
              </ButtonStyled>

              <ButtonOutlineStyled
                outline
                onClick={() => {
                  setLoginModal(true)
                  setIsOpen(false)
                }}
              >
                Entrar
              </ButtonOutlineStyled>
            </Modal>
          )}

          {/* TEMPORARY SIGN UP MODAL */}
          <Modal isOpen={signupModal} toggleModal={() => setSignupModal(false)}>
            <Title as="h1" fontWeight="bold">
              I AM SIGN UP MODAL
            </Title>
          </Modal>
          {/* TEMPORARY LOGIN MODAL */}
          <Modal isOpen={loginModal} toggleModal={() => setLoginModal(false)}>
            <Title as="h1" fontWeight="bold">
              I AM LOGIN MODAL
            </Title>
          </Modal>
        </FlexBox>

        <Text fontWeight="bold">Temas</Text>

        <SelectGroup
          label="Context API"
          placeholder="Selecciona tema"
          id="theme"
          name="theme"
          options={options}
          color="blue"
        />

        <ButtonContainterStyled
          direction="row"
          align="start"
          justify="flex-start"
        >
          <Button>Vídeos</Button>
          <Button>Cursos</Button>
          <Button>Blogs</Button>
        </ButtonContainterStyled>
      </HeaderContainerStyled>

      <SubHeaderContainerStyled direction="row" justify="space-between">
        <Text fontWeight="bold">23 resultados</Text>

        <TextContainerStyled direction="row">
          <Text fontWeight="bold">Votos ↓</Text>

          <Text color={colors.gray.gray3}>Fecha</Text>
        </TextContainerStyled>
      </SubHeaderContainerStyled>

      {stackData.map((sd) => (
        <CardResource
          key={sd.id}
          img={sd?.img}
          id={sd.createdOn}
          title={sd.title}
          url={sd.url}
          description={sd.description}
          likes={sd.likes}
          createdBy={sd.createdBy}
          createdOn={sd.createdOn}
        />
      ))}
    </>
  )
}

export { Resource }
