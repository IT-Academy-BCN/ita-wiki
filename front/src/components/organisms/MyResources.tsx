import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthProvider'
import { paths, urls } from '../../constants'
import { ResourceTitleLink } from '../molecules'
import { Title, Spinner, Icon, Link, Text } from '../atoms'
import { FlexBox, colors, dimensions } from '../../styles'

type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  topics: {
    topic: {
      id: string
      name: string
      slug: string
      categoryId: string
      createdAt: string
      updatedAt: string
    }
  }[]
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
}

const TitleContainer = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.xl};
`
const ResourcesUserStyled = styled(FlexBox)`
  align-items: flex-start;
  margin-bottom: ${dimensions.spacing.md};
`
const StyledLink = styled(Link)`
  color: ${colors.gray.gray4};
  font-weight: 'regular';
`
const Styledtext = styled(Text)`
  color: ${colors.gray.gray4};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`
/* const getResourcesByUser = async (categorySlug: string | undefined) => {
  const response = await fetch(
    `${urls.getResources}?category=${categorySlug}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Error fetching resources: ${response.statusText}`)
  }

  const data = await response.json()
  return data.resources
} */
// ---------SIMULACION LLAMADA BACKEND-------------------------------
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const mockFetch = async (url: string) => {
  // Simulamos una pequeña demora para simular una solicitud asíncrona
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve() // Resuelve la promesa después del tiempo especificado
    }, 1000)
  })
  // Mock de la respuesta del backend
  /* const response = {
    resources: [
      {
        id: '1',
        title: 'My Resource in Javascript',
        slug: 'my-resource-in-javascript',
        description: 'Lorem ipsum javascript',
        url: 'https://tutorials.cat/learn/javascript',
        resourceType: 'BLOG',
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
        user: {
          name: 'Usuario Ejemplo',
          email: 'usuario@example.com',
        },
        topics: [
          {
            topic: {
              id: '1',
              name: 'React',
              slug: 'react',
              categoryId: '1',
              createdAt: '2022-01-01',
              updatedAt: '2022-01-02',
            },
          },
        ],
        voteCount: {
          upvote: 14,
          downvote: 2,
          total: 12,
        },
      },
    ],
  } */
  const response = { resources: [] }
  return {
    ok: true,
    statusText: 'OK',
    json: async () => response,
  }
}

const MyResources = () => {
  const { user } = useAuth()

  const params = useParams<{ slug: string }>()
  const categorySlug: string | undefined = params.slug

  const getResourcesByUser = async () => {
    // Simulamos una llamada a fetch utilizando mockFetch
    const response = await mockFetch(
      `${urls.getResourcesByUser}?category=${categorySlug}`
    )

    if (!response.ok) {
      throw new Error(`Error fetching resources: ${response.statusText}`)
    }

    const data = await response.json()
    return data.resources
  }
  /* const { isLoading, data, error } = useQuery({
    queryKey: ['getResourcesByUser', categorySlug],
    queryFn: () => getResourcesByUser(categorySlug),
    enabled: !!user, // Enable the query only if there is a logged-in user
  }) */
  const { isLoading, data, error } = useQuery<TResource[], Error>({
    queryKey: ['getResourcesByUser', categorySlug],
    queryFn: getResourcesByUser,
    enabled: true, // Mantenemos la query siempre habilitada
  })

  // Simulamos un usuario logueado
  /* const user = {
    name: 'Usuario Ejemplo',
    email: 'usuario@example.com',
  } */

  return (
    <>
      <TitleContainer>
        <Icon name="menu_book" fill={0} />
        <Title as="h2" fontWeight="bold">
          Mis recursos
        </Title>
      </TitleContainer>

      {!user && (
        <>
          <Styledtext style={{ marginBottom: 0 }}>
            <StyledLink href={paths.register} style={{ marginLeft: 0 }}>
              Regístrate
            </StyledLink>{' '}
            o<StyledLink href={paths.login}>inicia sesión</StyledLink>para
          </Styledtext>
          <Styledtext style={{ marginTop: 0 }}>
            añadir recursos favoritos
          </Styledtext>
        </>
      )}

      {isLoading && user && <Spinner />}

      {!isLoading &&
        !error &&
        (data && data.length > 0 ? (
          data.map((resource: TResource) => (
            <ResourcesUserStyled key={resource.id}>
              <ResourceTitleLink
                url={resource.url}
                title={resource.title}
                description={resource.description}
              />
            </ResourcesUserStyled>
          ))
        ) : (
          <Text color={colors.gray.gray4}>No has subido ningún recurso</Text>
        ))}
    </>
  )
}

export { MyResources }
