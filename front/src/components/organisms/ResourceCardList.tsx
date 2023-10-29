import styled from 'styled-components'
import { FC } from 'react'
import { FlexBox, dimensions } from '../../styles'
import { Spinner, Text } from '../atoms'
import CardResource from './CardResource'
import { useSortByDate } from '../../hooks/useSortByDate'
import { useAuth } from '../../context/AuthProvider'
import { useFiltersContext } from '../../context/store/context'
import { TFilters } from '../../types'
import { useGetResources } from '../../hooks'

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
    userVote: number
  }
  resourceType: string
  topics: TTopic[]
  isFavorite: boolean
}

const SpinnerStyled = styled(Spinner)`
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

type SortOrder = 'asc' | 'desc'

type TResourceCardList = {
  sortOrder: SortOrder
  handleAccessModal: () => void
}

const ResourceCardList: FC<TResourceCardList> = ({
  handleAccessModal,
  sortOrder,
}) => {
  const { user } = useAuth()

  const { types, status, topics } = useFiltersContext()

  const filters: TFilters = {
    resourceTypes: types,
    status,
    topics,
  }

  const { isLoading, data, error } = useGetResources(filters)

  const { sortedItems } = useSortByDate<TResource>(data, 'updatedAt', sortOrder)

  // const prueba = sortedItems.map((item) =>
  //   item.topics.map((topicObj) => topicObj.topic.categoryId)
  // )

  // console.log('prueba', topics, status, types)

  if (error) return <p>Ha habido un error...</p>
  return (
    <StyledFlexBox direction="column" data-testid="resource-list">
      {isLoading && <SpinnerStyled size="medium" role="status" />}
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
            createdAt={resource.createdAt}
            updatedAt={resource.updatedAt}
            handleAccessModal={handleAccessModal}
            isFavorite={user ? resource.isFavorite : false}
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
