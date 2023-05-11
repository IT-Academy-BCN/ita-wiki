import styled from 'styled-components'
import { FC, SetStateAction, useState } from 'react'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions } from '../styles'
import { Icon, Text, Title } from '../components/atoms'
import {
  CardResource,
  InputGroup,
  ResourceTitleLink,
} from '../components/molecules'
import {
  HowToHelpCard,
  CategoriesList,
  ResourcesList,
} from '../components/organisms'
import { useSearch } from '../utils/hooks/useSearch'

type TResource = {
  id: string
  title: string
  createdBy: string
  createdOn: string
  description: string
  img: string
  url: string
}

const resources: TResource[] = [
  {
    id: 'resourceId1',
    title: 'JavaScript en 45 segundos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Proyecto práctico',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link1',
  },
  {
    id: 'resourceId2',
    title: 'REST API de cero a  ninja!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link2',
  },
  {
    id: 'resourceId3',
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link3',
  },
  {
    id: 'resourceId4',
    title: 'Redux para principiantes!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link4',
  },
]
const dataSubjects = [
  { id: 1, subject: 'Primeros pasos' },
  { id: 2, subject: 'Components' },
  { id: 3, subject: 'useState y useEffect' },
  { id: 4, subject: 'Eventos' },
  { id: 5, subject: 'Renderizado condicional' },
  { id: 6, subject: 'Listas' },
  { id: 7, subject: 'Estilos' },
  { id: 8, subject: 'Debuggin' },
  { id: 9, subject: 'React Router' },
  { id: 10, subject: 'Hooks' },
  { id: 11, subject: 'Context API' },
  { id: 12, subject: 'Redux' },
  { id: 13, subject: 'Proyectos' },
  { id: 14, subject: 'Testing' },
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
  padding: ${dimensions.spacing.lg} ${dimensions.spacing.lg} 0
    ${dimensions.spacing.lg};
  align-items: stretch;
  gap: ${dimensions.spacing.base};
`
const GrayBackground = styled.div`
  z-index: -9999;
  position: absolute;
  width: 100%;
  height: 155px;
  background-color: ${colors.gray.gray5};
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

const VideoContainer = styled(FlexBox)`
  flex-direction: row;
  margin-right: ${dimensions.spacing.xxxs};
  border: solid 1px black;
  border-radius: ${dimensions.borderRadius.base};
  padding-right: ${dimensions.spacing.xxxs};
  padding-left: ${dimensions.spacing.xxxs};
`

type TLinkStyled = {
  active?: boolean
}

const LinkStyled = styled.a<TLinkStyled>`
  color: ${({ active }) => (active ? colors.primary : colors.gray.gray3)};
  font-weight: ${({ active }) => (active ? 'bold' : 'regular')};
  border: ${({ active }) => (active ? 'solid 1px black' : 'none')};
  border-radius: ${dimensions.borderRadius.base};
  padding: ${dimensions.spacing.xxs};
  width: 100%;
  margin-top: ${dimensions.spacing.base};
  cursor: pointer;
`

// END style Desktop

const Home: FC = () => {
  const [activeLink, setActiveLink] = useState('')
  const [query, setQuery] = useState('')

  const handleClick = (link: SetStateAction<string>) => {
    setActiveLink(link)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const { filteredItems } = useSearch(resources, query)

  return (
    <>
      <MobileStyled>
        <GrayBackground />
        <HeaderContainerStyled>
          <HowToHelpCard />
          <InputGroup
            label="Buscar"
            placeholder="¿Buscas un tema en concreto?"
            id="search"
            name="search"
            icon="search"
            color={colors.gray.gray3}
          />
        </HeaderContainerStyled>
        <CategoriesList />
        <ResourcesList title="Recursos que te gustan" resources={resources} />
        <ResourcesList title="Tus recursos" resources={resources} />
      </MobileStyled>
      <DesktopStyled>
        <MainContainer>
          <CategoriesList />
          {/* ==> CONTAINER CON LAS LAS COLUMNAS */}
          <DivStyled>
            {/* ==> COLUMNA BÚSQUEDA */}
            <SideColumnContainer>
              <Text fontWeight="bold">Temas de React</Text>
              {dataSubjects.map((sub) => (
                <LinkStyled
                  key={sub.id}
                  active={activeLink === sub.subject}
                  onClick={() => handleClick(sub.subject)}
                >
                  {sub.subject}
                </LinkStyled>
              ))}
            </SideColumnContainer>
            {/* ==> COLUMNA RECURSOS */}
            <MiddleColumnContainer>
              <Title as="h2" fontWeight="bold">
                Recursos Componentes
              </Title>
              {/* ==> LÍNEA DE VÍDEOS, VOTOS Y FECHA */}
              <FlexBox
                justify="space-between"
                direction="row"
                style={{ width: '100%' }}
              >
                {/* ==> VÍDEOS */}
                <VideoContainer>
                  <Text fontWeight="bold">Vídeos</Text>
                  <Icon name="expand_more" />
                </VideoContainer>
                {/* ==> VOTOS Y FECHA */}
                <FlexBox direction="row">
                  <FlexBox direction="row">
                    <Text fontWeight="bold">Votos</Text>
                    <Icon name="arrow_downward" />
                  </FlexBox>
                  <Text color={colors.gray.gray3}>Fecha</Text>
                </FlexBox>
              </FlexBox>
              {filteredItems.map((resource) => (
                <CardResource
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  url={resource.url}
                  img={icons.profileAvatar}
                  createdBy={resource.createdBy}
                  createdOn={resource.createdOn}
                />
              ))}
            </MiddleColumnContainer>
            {/* ==> COLUMNA USUARIO */}
            <SideColumnContainer>
              {/* TÍTULO 1 */}
              <InputGroup
                label="search-resource"
                name="search-resource"
                placeholder="Buscar recurso concreto"
                id="search-resource"
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
              {resources.map((fav) => (
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
              {resources.map((res) => (
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

export { Home }
