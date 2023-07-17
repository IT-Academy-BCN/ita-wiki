import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Text } from '../atoms'
import { CreateAuthor } from './CreateAuthor'
import { ResourceTitleLink } from './ResourceTitleLink'
import { VoteCounter } from './VoteCounter'
// eslint-disable-next-line import/no-cycle
import { EditResource } from '../organisms'

const CardContainerStyled = styled(FlexBox)`
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray4};
  height: 7rem;
  padding: ${dimensions.spacing.xxs} ${dimensions.spacing.xs};
  width: 100%;
  min-width: 15rem;
  position: relative;
`

const CounterContainerStyled = styled(FlexBox)`
  margin: 0 ${dimensions.spacing.xs};
  align-self: flex-start;

  ${Text} {
    margin: 0rem;
  }
`

const FlexBoxStyled = styled(FlexBox)`
  height: 100%;

  ${FlexBox} {
    gap: 2px;
  }

  ${Text} {
    margin: 0rem;
    margin-top: 2px;
  }
`
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
export type TCardResource = {
  createdBy: string
  createdAt: string
  description: string
  img: string | undefined
  id: string
  likes?: number
  title: string
  updatedAt: string
  url: string
  resourceType: string
  topics: TTopic[]
  editable: boolean
  handleAccessModal: () => void
}

export const CardResource = ({
  createdBy,
  createdAt,
  description,
  img,
  likes,
  id,
  title,
  updatedAt,
  url,
  editable,
  resourceType,
  topics,
  handleAccessModal,
  ...rest
}: TCardResource) => (
  <CardContainerStyled
    data-testid="resource-card"
    direction="row"
    align="center"
    justify="flex-start"
    id={id}
    {...rest}
  >
    {editable && (
      <EditResource
        description={description}
        id={id}
        title={title}
        url={url}
        resourceType={resourceType}
        topics={topics}
        {...rest}
      />
    )}
    {Number.isInteger(likes) && (
      <CounterContainerStyled>
        <VoteCounter
          voteCount={likes || 0}
          resourceId={id}
          handleAccessModal={handleAccessModal || undefined}
        />
      </CounterContainerStyled>
    )}
    <FlexBoxStyled align="start" justify="space-between" gap="4px">
      <ResourceTitleLink description={description} title={title} url={url} />
      <CreateAuthor createdBy={createdBy} createdOn={createdOn} img={img} />
    </FlexBoxStyled>
  </CardContainerStyled>
)
