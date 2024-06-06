import styled from 'styled-components'
import {
  CreateAuthor,
  FlexBox,
  ResourceTitleLink,
  Text,
  VoteCounter,
  colors,
  dimensions,
} from '@itacademy/ui'
import { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EditResource } from './EditResource'
import { useAuth } from '../../context/AuthProvider'
import { TCardResource, TResource, TUserVote } from '../../types'
import { FavoritesIcon } from '../molecules'
import { updateVote } from '../../helpers/fetchers'
import { updateCachedVoteCount } from '../../helpers'

const CardContainerStyled = styled(FlexBox)`
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray4};
  padding: ${dimensions.spacing.xxs} ${dimensions.spacing.xs};
  width: 100%;
  min-width: 15rem;
  position: relative;
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

export const CardResource: FC<TCardResource> = ({
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
}) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const castVote = useMutation({
    mutationFn: updateVote,
    onSuccess: (_, { vote }) => {
      const queryCacheGetResources = queryClient
        .getQueryCache()
        .findAll(['getResources'])

      const queryCacheGetResourcesByUser = queryClient
        .getQueryCache()
        .findAll(['getResourcesByUser'])

      const queryCacheGetFavorites = queryClient
        .getQueryCache()
        .findAll(['getFavorites'])

      const allQueryKeys = !fromProfile
        ? queryCacheGetResources
        : queryCacheGetResources.concat(
            queryCacheGetResourcesByUser,
            queryCacheGetFavorites
          )

      const queryKeys = allQueryKeys.map((q) => q.queryKey)

      for (let i = 0; i < queryKeys.length; i += 1) {
        const queryKey = queryKeys[i]

        queryClient.setQueryData(queryKey, (data?: TResource[]) => {
          const newData = data?.map((resource) => {
            if (resource.id !== id) return resource
            const newVoteCount = updateCachedVoteCount(resource.voteCount, vote)
            return {
              ...resource,
              voteCount: newVoteCount,
            }
          })
          return newData
        })
      }
    },
    onError: () => {
      // eslint-disable-next-line no-console
      console.error('Error voting')
    },
  })

  const handleClick = (vote: TUserVote) => {
    if (!user) {
      handleAccessModal()
      return
    }

    if (castVote?.isLoading) {
      return
    }

    if (
      (voteCount?.userVote === 1 && vote === 'up') ||
      (voteCount?.userVote === -1 && vote === 'down')
    ) {
      castVote?.mutate({ resourceId: id, vote: 'cancel' })
    } else {
      castVote?.mutate({ resourceId: id, vote })
    }
  }

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
          <VoteCounter voteCount={voteCount} onClick={handleClick} />
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
