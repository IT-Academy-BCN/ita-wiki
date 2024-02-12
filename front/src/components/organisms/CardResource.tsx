import styled from 'styled-components'
import { FlexBox, colors, dimensions, Text } from '@itacademy/ui'
import EditResource from './EditResource'
import { useAuth } from '../../context/AuthProvider'
import { TCardResource } from '../../types'
import {
  ResourceTitleLink,
  VoteCounter,
  CreateAuthor,
  FavoritesIcon,
} from '../molecules'

const CardContainerStyled = styled(FlexBox)`
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray4};
  padding: ${dimensions.spacing.xxs} ${dimensions.spacing.xs};
  width: 100%;
  min-width: 15rem;
  position: relative;
  align-items: flex-start;
`

const UserWidgets = styled(FlexBox)`
  top: ${dimensions.spacing.xxxs};
  right: ${dimensions.spacing.xxs};
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
`

const CounterContainerStyled = styled(FlexBox)`
  margin: 0 ${dimensions.spacing.xs} 0 0;
  align-self: flex-start;

  ${Text} {
    margin: 0rem;
  }
`

const FlexBoxStyled = styled(FlexBox)`
  height: 100%;
  width: 100%;

  ${FlexBox} {
    gap: 2px;
  }

  ${Text} {
    margin: 0rem;
    margin-top: 2px;
  }
`

const CardResource = ({
  createdBy,
  createdAt,
  description,
  img,
  voteCount,
  id,
  title,
  updatedAt,
  url,
  editable,
  resourceType,
  topics,
  isFavorite,
  handleAccessModal,
  fromProfile,
  ...rest
}: TCardResource) => {
  const { user } = useAuth()

  return (
    <CardContainerStyled
      data-testid="resource-card"
      direction="row"
      align="center"
      justify="flex-start"
      id={id}
      {...rest}
    >
      {voteCount && (
        <CounterContainerStyled>
          <VoteCounter
            voteCount={voteCount}
            resourceId={id}
            handleAccessModal={handleAccessModal || undefined}
            fromProfile={fromProfile}
          />
        </CounterContainerStyled>
      )}

      <FlexBoxStyled align="start" justify="space-between" gap="4px">
        <ResourceTitleLink
          description={description}
          title={title}
          url={url}
          id={id}
        />
        <CreateAuthor createdBy={createdBy} updatedAt={updatedAt} img={img} />
      </FlexBoxStyled>

      {user ? (
        <UserWidgets direction="row" gap="0.5rem">
          {editable && (
            <EditResource
              description={description}
              id={id}
              title={title}
              url={url}
              resourceType={resourceType}
              topics={topics}
              isInCardResource
              {...rest}
            />
          )}
          <FavoritesIcon
            resourceId={id}
            isFavorite={isFavorite}
            fromProfile={fromProfile}
          />
        </UserWidgets>
      ) : null}
    </CardContainerStyled>
  )
}

export default CardResource
