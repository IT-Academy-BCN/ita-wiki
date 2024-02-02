import styled from 'styled-components'
import { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FlexBox, colors, Text, Icon } from '@itacademy/ui'
import { useAuth } from '../../context/AuthProvider'
import { updateCachedVoteCount } from '../../helpers'
import { updateVote } from '../../helpers/fetchers'
import { TResource, TVoteCount } from '../../types'

type ArrowProp = {
  color: string
}

const StyledIcon = styled(Icon)<ArrowProp>`
  color: ${({ color }) => color};

  &:hover {
    color: ${({ name }) =>
      (name === 'expand_less' && colors.success) ||
      (name === 'expand_more' && colors.error)};
  }
`

type TVoteCounter = {
  voteCount: TVoteCount
  resourceId: string
  handleAccessModal: () => void
  fromProfile?: boolean
}

type TUserVote = 'up' | 'down' | 'cancel'

export const VoteCounter: FC<TVoteCounter> = ({
  voteCount,
  resourceId,
  handleAccessModal,
  fromProfile,
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
            if (resource.id !== resourceId) return resource
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

    if (
      (voteCount.userVote === 1 && vote === 'up') ||
      (voteCount.userVote === -1 && vote === 'down')
    ) {
      castVote.mutate({ resourceId, vote: 'cancel' })
    } else {
      castVote.mutate({ resourceId, vote })
    }
  }

  return (
    <FlexBox data-testid="voteCounter">
      <StyledIcon
        name="expand_less"
        data-testid="increase"
        color={voteCount.userVote > 0 ? colors.success : colors.gray.gray3}
        onClick={() => handleClick('up')}
      />
      <Text
        fontWeight="bold"
        style={{ marginTop: '0', marginBottom: '0' }}
        data-testid="voteTest"
      >
        {voteCount.total}
      </Text>
      <StyledIcon
        name="expand_more"
        id="decrease"
        data-testid="decrease"
        color={voteCount.userVote < 0 ? colors.error : colors.gray.gray3}
        onClick={() => handleClick('down')}
      />
    </FlexBox>
  )
}
