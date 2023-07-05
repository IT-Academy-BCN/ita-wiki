import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { urls } from '../../constants'
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
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  overflow: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledText = styled(Text)`
  margin: 2rem;
`

const getResources = (categorySlug: string | undefined) =>
  fetch(`${urls.getResources}?category=${categorySlug}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching resources: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching resources: ${err.message}`)
    })

type TResourceCardList = {
  handleAccessModal: () => void
}

const ResourceCardList = ({ handleAccessModal }: TResourceCardList) => {
  const params = useParams()

  const categorySlug: string | undefined = params.slug

  const { isLoading, data, error } = useQuery({
    queryKey: ['getResources', categorySlug],
    queryFn: () => getResources(categorySlug),
  })

  if (error) return <p>Ha habido un error...</p>

  return (
    <StyledFlexBox direction="column">
      {isLoading && <StyledSpinner role="status" />}
      {data?.resources?.length > 0 ? (
        data.resources
          .sort(
            (
              a: { createdAt: string | number | Date },
              b: { createdAt: string | number | Date }
            ) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((resource: TResource) => (
            <CardResource
              key={resource.id}
              id={resource.id}
              img=""
              title={resource.title}
              url={resource.url}
              description={resource.description}
              likes={resource.voteCount.total}
              createdBy={resource.user.name}
              createdOn={resource.createdAt}
              updatedOn={resource.updatedAt}
              handleAccessModal={handleAccessModal}
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
  )
}

export { ResourceCardList }
