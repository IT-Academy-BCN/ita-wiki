import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions } from '../styles'
import { Button, Icon, Radio, Text, Title } from '../components/atoms'
import {
  CardResource,
  InputGroup,
  Modal,
  SelectGroup,
  ResourceTitleLink,
} from '../components/molecules'
import { CategoriesList, ResourceForm } from '../components/organisms'
import { useSearch } from '../hooks'
import { FilterType } from '../components/molecules/FilterType'

const dataSubjects = [
  { id: 'a0', label: 'Todos' },
  { id: 'a1', label: 'Primeros pasos' },
  { id: 'a2', label: 'Components' },
  { id: 'a3', label: 'useState y useEffect' },
  { id: 'a4', label: 'Eventos' },
  { id: 'a5', label: 'Renderizado condicional' },
  { id: 'a6', label: 'Listas' },
  { id: 'a7', label: 'Estilos' },
  { id: 'a8', label: 'Debuggin' },
  { id: 'a9', label: 'React Router' },
  { id: 'a10', label: 'Hooks' },
  { id: 'a11', label: 'Context API' },
  { id: 'a12', label: 'Redux' },
  { id: 'a13', label: 'Proyectos' },
  { id: 'a14', label: 'Testing' },
]

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

// TODO: mobile first!
export const MobileStyled = styled.div`
  display: block;
  @media only ${device.Laptop} {
    display: none;
  }
`
export const DesktopStyled = styled.div`
  display: none;
  @media only ${device.Laptop} {
    display: block;
  }
`
// Style Mobile

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

// END style Mobile
// style Desktop
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

const DivStyled = styled.div`
  display: flex;
  direction: row;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  border-radius: ${dimensions.borderRadius.base};
`

const UserResourcesContainerStyled = styled(FlexBox)`
  align-items: flex-start;
  margin-bottom: ${dimensions.spacing.md};
`

const ContainerGapStyled = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.xl};
  margin-bottom: ${dimensions.spacing.xl};
`

const FilterContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

const RadioFilters = styled(Radio)`
  flex-direction: column;
  align-items: start;
`

const SideColumnContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  padding: 2rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MiddleColumnContainer = styled(FlexBox)`
  flex-grow: 1.5;
  padding: 2rem;
  border-right: solid 1px black;
  border-left: solid 1px black;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
// END style Desktop

const Category: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const { state } = useLocation()

  const [query, setQuery] = useState('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const { filteredItems } = useSearch(stackData, query)
  return (
    <>
      <MobileStyled>
        <HeaderContainerStyled align="stretch">
          <FlexBox direction="row" justify="space-between">
            <Title as="h1" fontWeight="bold">
              Recursos de {state.name}
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
      </MobileStyled>
      <DesktopStyled>
        <MainContainer>
          <CategoriesList />
          {/* ==> CONTAINER CON LAS LAS COLUMNAS */}
          <DivStyled>
            {/* ==> COLUMNA BÚSQUEDA */}

            <SideColumnContainer>
              <Title as="h2" fontWeight="bold">
                Filtros
              </Title>
              <Text fontWeight="bold">Temas</Text>
              <FilterContainer>
                <RadioFilters
                  options={dataSubjects}
                  name="Topics"
                  defaultChecked="a0"
                />
              </FilterContainer>
              <FilterType />
            </SideColumnContainer>
            {/* ==> COLUMNA RECURSOS */}
            <MiddleColumnContainer>
              <Title as="h2" fontWeight="bold">
                Recursos
              </Title>
              {/* ==> LÍNEA DE VÍDEOS, VOTOS Y FECHA */}
              <FlexBox
                justify="flex-end"
                direction="row"
                style={{ width: '100%' }}
              >
                {/* ==> VOTOS Y FECHA */}
                <FlexBox direction="row">
                  <FlexBox direction="row">
                    <Text fontWeight="bold">Votos</Text>
                    <Icon name="arrow_downward" />
                  </FlexBox>
                  <Text color={colors.gray.gray3}>Fecha</Text>
                </FlexBox>
              </FlexBox>
              {filteredItems.map((sd) => (
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
            </MiddleColumnContainer>
            {/* ==> COLUMNA USUARIO */}
            <SideColumnContainer>
              {/* TÍTULO 1 */}
              <InputGroup
                data-testid="inputGroupSearch"
                label="searchResource"
                name="searchResource"
                placeholder="Buscar recurso concreto"
                id="searchResource"
                icon="search"
                onChange={handleInput}
              />
              <ContainerGapStyled>
                <Icon name="favorite" fill={0} />
                <Title as="h2" fontWeight="bold">
                  Recursos favoritos
                </Title>
              </ContainerGapStyled>
              {/* ==> CONTENIDO FAVORITOS */}
              {stackData.map((fav) => (
                <UserResourcesContainerStyled key={fav.id}>
                  <ResourceTitleLink
                    url={fav.img}
                    title={fav.title}
                    description={fav.description}
                  />
                </UserResourcesContainerStyled>
              ))}

              {/* TÍTULO 2 */}
              <ContainerGapStyled>
                <Icon name="menu_book" fill={0} />
                <Title as="h2" fontWeight="bold">
                  Mis recursos
                </Title>
              </ContainerGapStyled>
              {/* ==> CONTENIDO MIS RECURSOS */}
              {stackData.map((res) => (
                <UserResourcesContainerStyled key={res.id}>
                  <ResourceTitleLink
                    url={res.img}
                    title={res.title}
                    description={res.description}
                  />
                </UserResourcesContainerStyled>
              ))}
            </SideColumnContainer>
          </DivStyled>
        </MainContainer>
      </DesktopStyled>
    </>
  )
}

export { Category }
