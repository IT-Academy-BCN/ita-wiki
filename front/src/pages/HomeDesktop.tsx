import { FC, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../styles'
import { CardResourceTemp, InputGroup } from '../components/molecules'
import { Icon, Text, Title } from '../components/atoms'
import icons from '../assets/icons/index'

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

const CategoriesContainerStyled = styled(FlexBox)`
  padding: ${dimensions.spacing.lg};
  margin-right: 1rem;
  align-items: flex-start;
  color: ${colors.gray.gray3};
`

const UserResourcesContainerStyled = styled(FlexBox)`
  margin-top: ${dimensions.spacing.base};
  align-items: flex-start;
  margin-bottom: ${dimensions.spacing.lg};
`

const ContainerGapStyled = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxxs};
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

const ImgStyled = styled.img`
  height: 30px;
  margin-right: ${dimensions.spacing.base};
  margin-top: ${dimensions.spacing.xxl};
`

const TextStyled = styled(Text)`
  margin: 0rem;
  margin-top: 5px;
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
`
const CategoryLinkStyled = styled.a<TLinkStyled>`
  color: ${({ active }) => (active ? colors.black.black3 : colors.gray.gray3)};
  font-weight: ${({ active }) => (active ? 'bold' : 'regular')};
  margin-top: ${dimensions.spacing.xxl};
`

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

const resources = [
  {
    id: 1,
    title: 'Context en 20 minutos',
    subtitle: 'Teoría con ejemplos',
    name: 'Jane Doe',
    date: '20/01/2023',
  },
  {
    id: 2,
    title: 'Redux para principiantes',
    subtitle: 'Teoría con ejemplos',
    name: 'Jane Doe',
    date: '20/01/2023',
  },
  {
    id: 3,
    title: 'REST API de cero a  ninja',
    subtitle: 'Proyecto práctico',
    name: 'Jane Doe',
    date: '20/01/2023',
  },
  {
    id: 4,
    title: 'Redux para principiantes',
    subtitle: 'Teoría con ejemplos',
    name: 'Jane Doe',
    date: '20/01/2023',
  },
]

const categories = [
  {
    id: 1,
    category: 'Javascript',
    image: icons.javascript,
    alt: 'javascript logo',
  },
  { id: 2, category: 'React', image: icons.react, alt: 'react logo' },
  { id: 3, category: 'Angular', image: icons.angular, alt: 'angular logo' },
  {
    id: 4,
    category: 'Data Science',
    image: icons.dataScience,
    alt: 'data science logo',
  },
]

const HomeDesktop: FC = () => {
  const [activeLink, setActiveLink] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const handleClick = (link: SetStateAction<string>) => {
    setActiveLink(link)
  }
  const handleCategoryClick = (cat: SetStateAction<string>) => {
    setActiveCategory(cat)
  }

  return (
    <MainContainer>
      <CategoriesContainerStyled>
        {categories.map((category) => (
          <FlexBox direction="row" key={category.id}>
            <ImgStyled src={category.image} alt={category.alt} />
            <CategoryLinkStyled
              active={activeCategory === category.category}
              onClick={() => handleCategoryClick(category.category)}
            >
              {category.category}
            </CategoryLinkStyled>
          </FlexBox>
        ))}
      </CategoriesContainerStyled>
      {/* ==> CONTAINER CON LAS LAS COLUMNAS */}
      <DivStyled>
        {/* ==> COLUMNA BÚSQUEDA */}
        <SideColumnContainer>
          <InputGroup
            label="search-resource"
            name="search-resource"
            placeholder="Buscar recurso concreto"
            id="search-resource"
          />
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
          {resources.map((resource) => (
            <CardResourceTemp
              createdBy={resource.name}
              createdOn={resource.date}
              title={resource.title}
              likes={10}
              description={resource.subtitle}
            />
          ))}
        </MiddleColumnContainer>
        {/* ==> COLUMNA USUARIO */}
        <SideColumnContainer>
          {/* TÍTULO 1 */}
          <ContainerGapStyled>
            <Icon name="favorite" fill={0} />
            <Title as="h2" fontWeight="bold">
              Recursos favoritos
            </Title>
          </ContainerGapStyled>
          {/* ==> CONTENIDO FAVORITOS */}
          {resources.map((fav) => (
            <UserResourcesContainerStyled>
              <TextStyled key={fav.id} fontWeight="bold">
                {fav.title}
              </TextStyled>
              <TextStyled fontSize="small" color={colors.gray.gray3}>
                {fav.subtitle}
              </TextStyled>
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
            <UserResourcesContainerStyled>
              <TextStyled key={res.id} fontWeight="bold">
                {res.title}
              </TextStyled>
              <TextStyled fontSize="small" color={colors.gray.gray3}>
                {res.subtitle}
              </TextStyled>
            </UserResourcesContainerStyled>
          ))}
        </SideColumnContainer>
      </DivStyled>
    </MainContainer>
  )
}

export { HomeDesktop }
