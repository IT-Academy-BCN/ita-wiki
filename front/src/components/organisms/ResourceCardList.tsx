import styled from 'styled-components'
import { FC } from 'react'
import { FlexBox, dimensions } from '../../styles'
import { Spinner, Text } from '../atoms'
import CardResource from './CardResource'
import { useSortByDate } from '../../hooks/useSortByDate'
import { useAuth } from '../../context/AuthProvider'
import { TResource, TFilters } from '../../types'
import { useGetResources } from '../../hooks'

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
  filters: TFilters
  sortOrder: SortOrder
  handleAccessModal: () => void
}

const ResourceCardList: FC<TResourceCardList> = ({
  handleAccessModal,
  sortOrder,
  filters,
}) => {
  const { user } = useAuth()
  const { isLoading, data, error } = useGetResources(filters)
  const { sortedItems } = useSortByDate<TResource>(data, 'updatedAt', sortOrder)
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
            voteCount={resource.voteCount}
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
