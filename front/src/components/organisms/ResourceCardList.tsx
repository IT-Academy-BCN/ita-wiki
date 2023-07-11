import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { FC } from 'react'
import { urls } from '../../constants'
import { FlexBox, dimensions } from '../../styles'
import { Spinner, Text } from '../atoms'
// eslint-disable-next-line import/no-cycle
import { CardResource } from '../molecules'
import { TFilters, buildQueryString } from '../../helpers'
import { useSortByDate } from '../../hooks/useSortByDate'
import { useAuth } from '../../context/AuthProvider'

type TTopic = {
  topic: {
    id: string
    name: string
    slug: string
    categoryId: string
    createdAt: string
    updatedAt: string
  }
}
export type TResource = {
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
  resourceType: string
  topics: TTopic[]
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

const getResources = async (filters: string) =>
  fetch(`${urls.getResources}?${filters}`, {
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
  filters: TFilters
  sortOrder: 'ascending' | 'descending'
  handleAccessModal: () => void
}

type TResources = TResource[]

const ResourceCardList: FC<TResourceCardList> = ({
  handleAccessModal,
  sortOrder,
  filters,
}) => {
  const { user } = useAuth()

  const { isLoading, data, error } = useQuery<TResources>(
    ['getResources', buildQueryString(filters) || ''],
    () => getResources(buildQueryString(filters) || '')
  )

  const { sortedItems } = useSortByDate(data || [], sortOrder)

  if (error) return <p>Ha habido un error...</p>

  return (
    <StyledFlexBox direction="column">
      {isLoading && <StyledSpinner role="status" />}
      {data && data?.length > 0 ? (
        sortedItems?.map((resource: TResource) => (
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
            editable={user?.name === resource.user.name}
            resourceType={resource.resourceType}
            topics={resource.topics}
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
