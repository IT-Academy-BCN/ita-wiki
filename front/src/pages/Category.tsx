import { FC } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FlexBox, colors, device, dimensions } from '../styles'
import { Icon, Text, Title } from '../components/atoms'
import {
  InputGroup,
  StatusFilterWidget,
  TypesFilterWidget,
} from '../components/molecules'
import {
  CategoriesList,
  MyFavoritesList,
  MyResources,
  ResourceCardList,
  TopicsRadioWidget,
} from '../components/organisms'
import { Resource } from './Resource'
import icons from '../assets/icons'
import { paths } from '../constants'

type TFakeResource = {
  id: string
  title: string
  createdBy: string
  createdOn: string
  description: string
  img: string
  url: string
  likes: number
}

export const resources: TFakeResource[] = [
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

const ScrollList = styled(FlexBox)`
  overflow: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

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

const LateralDiv = styled.div`
  height: 100%;
`

const UserResourcesContainerStyled = styled(FlexBox)`
  align-items: flex-start;
  margin-bottom: ${dimensions.spacing.md};
`

const ImageStyled = styled.img`
  margin-bottom: ${dimensions.spacing.xl};
  margin-left: ${dimensions.spacing.xl};
  max-width: 79px;
  height: auto;
`

const SideColumnContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 2 20rem;
  padding: 2rem 2rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.Desktop} {
    padding: 2rem 3rem;
  }
`

const MiddleColumnContainer = styled(FlexBox)`
  flex: 4 1 26rem;
  padding: 2rem 3rem;
  border-right: solid 1px ${colors.gray.gray3};
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
// END style Desktop

const Category: FC = () => {
  const { state } = useLocation()
  const { slug } = useParams()

  const handleTypesFilter = (selectedTypes: string[]) => {
    // TODO: Use this info to filter resources by type
    // eslint-disable-next-line no-console
    console.log('Parent', selectedTypes)
  }

  const handleStatusFilter = (selectedStatus: string[]) => {
    // TODO: Use this info to filter resources by status
    // eslint-disable-next-line no-console
    console.log('Parent', selectedStatus)
  }

  return (
    <>
      <MobileStyled>
        <Resource />
      </MobileStyled>
      <DesktopStyled>
        <MainContainer>
          <LateralDiv>
            <Link to={paths.home}>
              <ImageStyled src={icons.itLogo} alt="logo" />
            </Link>
            <CategoriesList />
          </LateralDiv>
          {/* ==> CONTAINER CON LAS LAS COLUMNAS */}
          <DivStyled>
            {/* ==> COLUMNA BÚSQUEDA */}

            <SideColumnContainer>
              <Title as="h2" fontWeight="bold">
                Filtros
              </Title>
              <Text fontWeight="bold">Temas</Text>
              {slug && <TopicsRadioWidget slug={slug} />}
              <TypesFilterWidget handleTypesFilter={handleTypesFilter} />
              <StatusFilterWidget handleStatusFilter={handleStatusFilter} />
            </SideColumnContainer>
            {/* ==> COLUMNA RECURSOS */}
            <MiddleColumnContainer>
              <Title as="h2" fontWeight="bold">
                Recursos de {state?.name}
              </Title>
              {/* ==> LÍNEA DE VÍDEOS, VOTOS Y FECHA */}
              <FlexBox
                justify="flex-end"
                direction="row"
                style={{ width: '100%' }}
              >
                {/* ==> VOTOS Y FECHA */}
                <FlexBox direction="row" gap="15px">
                  <FlexBox direction="row">
                    <Text fontWeight="bold">Votos</Text>
                    <Icon name="arrow_downward" />
                  </FlexBox>
                  <Text color={colors.gray.gray3}>Fecha</Text>
                </FlexBox>
              </FlexBox>
              <ScrollList>
                <ResourceCardList />
              </ScrollList>
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
              />
              <MyFavoritesList />
              {/* TÍTULO 2 */}
              <UserResourcesContainerStyled>
                <MyResources />
              </UserResourcesContainerStyled>
            </SideColumnContainer>
          </DivStyled>
        </MainContainer>
      </DesktopStyled>
    </>
  )
}

export { Category }
