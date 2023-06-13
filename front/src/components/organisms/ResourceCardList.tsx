import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { urls } from '../../constants'
import styled from 'styled-components'
import { FlexBox, dimensions } from '../../styles'
import { Spinner, Text } from '../atoms'
import { CardResource } from '../molecules'

type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
    imgAvatar: string //BACK AFEGIR:
  }
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
}

const StyledSpinner = styled(Spinner)`
  width: 100px;
  height: 100px;
  align-self: center;
  justify-content: center;
`

const StyledFlexBox = styled(FlexBox)`
  padding-left: ${dimensions.spacing.lg};
  margin-top: ${dimensions.spacing.lg};
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledText = styled(Text)`
  margin: 2rem;
`

const getResources = (categorySlug: string | undefined) =>
  fetch(urls.getResources + `?category=${categorySlug}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching resources: ${res.statusText}`)
      }
      console.log(res)
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching resources: ${err.message}`)
    })

const ResourceCardList = () => {
  const { slug } = useParams()

  const categorySlug: string | undefined = slug

  const { isLoading, data, error } = useQuery({
    queryKey: ['getResources', categorySlug],
    queryFn: () => getResources(categorySlug),
  })

  if (error) return <p>Ha habido un error...</p>

  console.log(data)
  return (
    <>
      <StyledFlexBox direction="column">
        {isLoading && <StyledSpinner role="status" />}
        {data?.resources?.length > 0 ? (
          data.resources.map((resource: TResource) => (
            <CardResource
              key={resource.id}
              id={resource.id}
              img={resource.user.imgAvatar}
              title={resource.title}
              url={resource.url}
              description={resource.description}
              likes={resource.voteCount.total}
              createdBy={resource.user.name}
              createdOn={resource.createdAt}
              updatedOn={resource.updatedAt}
            />
          ))
        ) : (
          <FlexBox>
            <StyledText data-testid="emptyResource">
              ¡Vaya! :/
              <br />
              <br />
              Todavía no hay recursos de este tipo.
            </StyledText>
          </FlexBox>
        )}
      </StyledFlexBox>
    </>
  )
}

export { ResourceCardList }
