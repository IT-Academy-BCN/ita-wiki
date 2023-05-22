import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { FlexBox, colors, device, dimensions } from '../styles'
import { Icon, Text, Title } from '../components/atoms'

import {
  CardResource,
  InputGroup,
  ResourceTitleLink,
} from '../components/molecules'
import { CategoriesList } from '../components/organisms'
import { useSearch } from '../hooks'
import { Resource } from './Resource'

type TResource = {
  id: string
  title: string
  createdBy: string
  createdOn: string
  description: string
  url: string
}

const resources: TResource[] = [
  {
    id: 'idResource1',
    title: 'JavaScript en 45 segundos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Proyecto práctico',
    url: 'https://www.youtube.com/shorts/tR0IZnDt_5Q',
  },
  {
    id: 'idResource2',
    title: 'REST API de cero a  ninja!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    url: 'https://www.youtube.com/watch?v=SbhzQqP1p70',
  },
  {
    id: 'idResource3',
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    url: 'https://www.youtube.com/watch?v=Ae33_gdJgnQ',
  },
  {
    id: 'idResource3',
    title: 'Redux para principiantes!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    url: 'https://www.youtube.com/watch?v=j-jzI3wkkVk&t=5s',
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
// END style Desktop

const Category: FC = () => {
  const { state } = useLocation()

  const [query, setQuery] = useState('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const { filteredItems } = useSearch(resources, query)
  return (
    <>
      <MobileStyled>
        <Resource />
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
              ...
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
              {resources.map((fav) => (
                <UserResourcesContainerStyled key={fav.id}>
                  <ResourceTitleLink
                    url={fav.url}
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
                    url={res.url}
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
