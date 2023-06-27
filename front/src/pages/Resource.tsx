import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthProvider'
import { FlexBox, colors, dimensions } from '../styles'
import { Button, Text, Title } from '../components/atoms/index'
import { Modal, SelectGroup, CardResource } from '../components/molecules/index'
import { ResourceForm, Navbar } from '../components/organisms/index'
import icons from '../assets/icons'
import { paths, urls } from '../constants'

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
  width: 52px;
`
const ButtonStyled = styled(Button)`
  font-weight: 500;
  margin: ${dimensions.spacing.xxxs} ${dimensions.spacing.xl};
  color: ${({ outline }) =>
    outline ? `${colors.gray.gray3}` : `${colors.white}`};
`

const StyledLink = styled.a`
  text-decoration: none;
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
  margin-bottom: 6rem;
`
type TMappedTopics = {
  id: string
  name: string
}

const Resource: FC = () => {
  const { slug } = useParams()
  const { user } = useAuth()

  const getTopics = () =>
    fetch(`${urls.getTopics}?slug=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching topics: ${res.statusText}`)
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(`Error fetching topics: ${err.message}`)
      })

  const { data: fetchedTopics } = useQuery({
    queryKey: ['getTopics', slug],
    queryFn: getTopics,
  })

  const mappedTopics = fetchedTopics?.topics.map((topic: TMappedTopics) => {
    const selectOptions = { value: topic.id, label: topic.name }
    return selectOptions
  })

  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

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
              <ResourceForm selectOptions={mappedTopics} />
              <ButtonStyled outline onClick={() => setIsOpen(false)}>
                Cancelar
              </ButtonStyled>
            </Modal>
          ) : (
            // RESTRICTED ACCESS MODAL
            <Modal isOpen={isOpen} toggleModal={() => setIsOpen(false)}>
              <ImgStyled src={icons.lockDynamic} />
              <Title as="h1" fontWeight="bold">
                Acceso restringido
              </Title>
              <StyledText>Regístrate para subir o votar contenido</StyledText>

              <ButtonStyled>
                {/* TEMPORARY LINK, THIS BUTTON WILL OPEN SIGNUP MODAL  */}
                <StyledLink href={paths.register}>Registrarme</StyledLink>
              </ButtonStyled>

              <ButtonStyled outline>
                {/* TEMPORARY LINK, THIS BUTTON WILL OPEN LOGIN MODAL  */}
                <StyledLink href={paths.login}>Entrar</StyledLink>
              </ButtonStyled>
            </Modal>
          )}
          {/* TODO: ADD SIGN UP MODAL */}
          {/* TODO: ADD LOGIN MODAL */}
        </FlexBox>

        <Text fontWeight="bold">Temas</Text>

        <SelectGroup
          label="Context API"
          placeholder="Selecciona tema"
          id="theme"
          name="theme"
          options={mappedTopics}
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
