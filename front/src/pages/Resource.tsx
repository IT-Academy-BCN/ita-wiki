import { FC, useState } from 'react'
import styled from 'styled-components'
import { Button, Text, Title } from '../components/atoms'
import { FlexBox, colors, dimensions } from '../styles'
import { Modal, SelectGroup } from '../components/molecules'
import { CardResource } from '../components/molecules/CardResource'
import icons from '../assets/icons'
import { ResourceForm } from '../components/organisms'

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
  { value: '0', label: 'Context API' },
  { value: '1', label: 'Redux Toolkit' },
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

const Resource: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <HeaderContainerStyled align="stretch">
        <FlexBox direction="row" justify="space-between">
          <Title as="h1" fontWeight="bold">
            Resource
          </Title>
          <Modal
            isOpen={isOpen}
            toggleModal={() => setIsOpen(false)}
            title="Nuevo Recurso"
          >
            <ResourceForm />
            <ButtonStyled outline onClick={() => setIsOpen(false)}>
              Cancelar
            </ButtonStyled>
          </Modal>
          <ButtonAddStyled onClick={openModal}>+</ButtonAddStyled>
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
          img={sd?.img}
          key={sd.createdOn}
          title={sd.title}
          description={sd.description}
          createdBy={sd.createdBy}
          createdOn={sd.createdOn}
          url={sd.url}
        />
      ))}
    </>
  )
}

export { Resource }
