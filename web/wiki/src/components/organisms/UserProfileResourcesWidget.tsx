import styled from 'styled-components'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FlexBox,
  Spinner,
  Title,
  colors,
  dimensions,
  device,
} from '@itacademy/ui'
import { useSortByDate, useSortByVotes } from '../../hooks'
import { TFavorites, TResource, TSortOrder } from '../../types'
import { CardResource } from './CardResource'
import { VotesDateController } from './VotesDateController'

type TResourcesWidget = {
  title: string
  titleMobile: string
  resourcesArray: TResource[] | TFavorites[] | undefined
  isLoading: boolean
  isError: boolean
}

const WidgetContainer = styled(FlexBox)`
  width: 100%;
  border-radius: ${dimensions.borderRadius.base};
  overflow: hidden;
  overflow-y: auto;
  padding-left: ${dimensions.spacing.lg};

  @media only ${device.Tablet} {
    height: 62vh;
    background-color: ${colors.white};
    flex-direction: column;
    align-items: flex-start;
    padding: ${dimensions.spacing.sm};
  }

  @media only ${device.Laptop} {
    flex-direction: column;
    align-items: flex-start;
    padding: ${dimensions.spacing.base} ${dimensions.spacing.xxl};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const TitleContainer = styled(FlexBox)`
  align-self: flex-start;
`

const CardsList = styled(FlexBox)`
  width: 100vw;
  overflow: hidden;
  overflow-x: auto;

  @media only ${device.Tablet} {
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTitle = styled(Title)`
  display: none;

  @media only ${device.Tablet} {
    display: block;
  }
`

const StyledTitleMobile = styled(Title)`
  display: block;

  @media only ${device.Tablet} {
    display: none;
  }
`

const StyledFlexbox = styled(FlexBox)`
  height: 100%;
  align-self: center;
`

export const UserProfileResourcesWidget: FC<TResourcesWidget> = ({
  title,
  titleMobile,
  resourcesArray,
  isLoading,
  isError,
}) => {
  const { t } = useTranslation()

  const [sortOrder, setSortOrder] = useState<TSortOrder>('desc')
  const [isSortByVotesActive, setIsSortByVotesActive] = useState(false)

  const handleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'desc' ? 'asc' : 'desc'))
  }

  const handleSortByVotes = () => {
    setIsSortByVotesActive(true)
  }

  const handleSortByDates = () => {
    setIsSortByVotesActive(false)
  }

  const { sortedItems } = useSortByDate<TResource | TFavorites>(
    resourcesArray,
    'updatedAt',
    sortOrder
  )
  const { sortedVotes } = useSortByVotes<TResource | TFavorites>(
    resourcesArray,
    sortOrder
  )

  const selectedSortOrder = isSortByVotesActive ? sortedVotes : sortedItems

  return (
    <WidgetContainer justify="flex-start">
      <TitleContainer data-testid="title" align="stretch">
        <StyledTitleMobile as="h3" fontWeight="bold">
          {titleMobile}
        </StyledTitleMobile>
        <StyledTitle as="h2" fontWeight="bold">
          {title}
        </StyledTitle>
      </TitleContainer>

      {isLoading && (
        <StyledFlexbox>
          <Spinner size="medium" role="status" />
        </StyledFlexbox>
      )}
      {!isLoading &&
        resourcesArray &&
        !isError &&
        (resourcesArray?.length > 0 ? (
          <>
            <VotesDateController
              sortOrder={sortOrder}
              handleSortOrder={handleSortOrder}
              handleSortByVotes={handleSortByVotes}
              handleSortByDates={handleSortByDates}
            />
            <CardsList
              direction="row"
              justify="flex-start"
              align="start"
              gap={`${dimensions.spacing.xs}`}
            >
              {selectedSortOrder?.map((resource) => (
                <CardResource
                  key={resource.id}
                  id={resource.id}
                  img={undefined}
                  title={resource.title}
                  url={resource.url}
                  description={resource.description}
                  voteCount={resource.voteCount}
                  createdBy={resource.user?.name ?? ''}
                  createdAt={resource.createdAt}
                  updatedAt={resource.updatedAt}
                  isFavorite={
                    'isFavorite' in resource ? resource.isFavorite : true
                  }
                  editable={'isFavorite' in resource ? true : resource.isAuthor}
                  resourceType={resource.resourceType}
                  topics={resource.topics}
                  handleAccessModal={() => {}}
                  fromProfile
                />
              ))}
            </CardsList>
          </>
        ) : (
          <StyledFlexbox>
            {title === t('Recursos favoritos')
              ? t('No tienes recursos favoritos')
              : t('No has subido ningún recurso')}
          </StyledFlexbox>
        ))}

      {isError && !isLoading ? (
        <StyledFlexbox>{t('Algo ha ido mal...')}</StyledFlexbox>
      ) : null}
    </WidgetContainer>
  )
}
