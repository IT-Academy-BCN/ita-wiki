import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FlexBox, colors, device, dimensions } from '../styles'
import { Icon, Spinner, Text, Title } from '../components/atoms'
import { ResourceCardList } from '../components/organisms'
import { urls } from '../constants'
import { useSearch } from '../hooks'

import {
  CardResource,
  InputGroup,
  ResourceTitleLink,
} from '../components/molecules'
import { CategoriesList } from '../components/organisms'
import { Resource } from './Resource'
import icons from '../assets/icons'

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

// const getTopicsByCategory = (categorySlug: string | undefined) =>
//   fetch(urls.getTopicsByCategory + categorySlug, {
//     headers: {
//       Accept: 'application/json',
//     },
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Error fetching topics: ${res.statusText}`)
//       }
//       console.log(res)
//       return res.json()
//     })
//     .catch((err) => {
//       throw new Error(`Error fetching topics: ${err.message}`)
//     })

const Category: FC = () => {
  const { state } = useLocation()
  // const { slug } = useParams()

  // const categorySlug: string | undefined = slug

  // const { isLoading, data, error } = useQuery({
  //   queryKey: ['getTopicsByCategory', categorySlug],
  //   queryFn: () => getTopicsByCategory(categorySlug),
  // })

  // // if (isLoading) return
  // if (error) return <p>Ha habido un error...</p>

  // console.log('DATA', data)
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
                {/* {data && <ResourceCardList resources={data?.topics} />}
              {isLoading && <StyledSpinner role="status" />} */}
                {/* {data?.topics.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
              {resources.map((sd) => (
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
              ))} */}
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
