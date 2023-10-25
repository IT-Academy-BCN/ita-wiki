import styled from 'styled-components'
import { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FlexBox, colors } from '../../styles'
import { Icon, Text } from '../atoms'
import { urls } from '../../constants'
import { useAuth } from '../../context/AuthProvider'
import { TResource } from '../../context/store/types'

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
}

type TVoteCount = {
  downvote: number
  upvote: number
  total: number
  userVote: number
}

type TUserVote = 'up' | 'down' | 'cancel'

type TVoteMutationData = {
  resourceId: string
  vote: TUserVote
}

const getDownvote = (
  currUserVote: number,
  currDownvote: number,
  currVote: TUserVote
) => {
  if (
    (currUserVote === 0 && currVote === 'up') ||
    (currUserVote === 1 && currVote === 'cancel')
  )
    return currDownvote
  if (
    (currUserVote === 0 && currVote === 'down') ||
    (currUserVote === 1 && currVote === 'down')
  )
    return currDownvote + 1
  return currDownvote - 1
}

const getUpvote = (
  currUserVote: number,
  currUpvote: number,
  currVote: TUserVote
) => {
  if (
    (currUserVote === 0 && currVote === 'down') ||
    (currUserVote === -1 && currVote === 'cancel')
  )
    return currUpvote
  if (
    (currUserVote === 0 && currVote === 'up') ||
    (currUserVote === -1 && currVote === 'up')
  )
    return currUpvote + 1
  return currUpvote - 1
}

const getTotal = (
  currUserVote: number,
  currTotal: number,
  currVote: TUserVote
) => {
  if (
    (currUserVote === 0 && currVote === 'up') ||
    (currUserVote === -1 && currVote === 'cancel')
  )
    return currTotal + 1
  if (
    (currUserVote === 1 && currVote === 'cancel') ||
    (currUserVote === 0 && currVote === 'down')
  )
    return currTotal - 1
  if (currUserVote === 1 && currVote === 'down') return currTotal - 2
  return currTotal + 2
}

const getUserVote = (currVote: TUserVote) => {
  if (currVote === 'up') return 1
  if (currVote === 'down') return -1
  return 0
}

const updateCachedVoteCount = (
  currentVoteCount: TVoteCount,
  vote: TUserVote
) => {
  const { downvote, upvote, total, userVote } = currentVoteCount

  return {
    downvote: getDownvote(userVote, downvote, vote),
    upvote: getUpvote(userVote, upvote, vote),
    total: getTotal(userVote, total, vote),
    userVote: getUserVote(vote),
  }
}

const updateVote = async ({ resourceId, vote }: TVoteMutationData) => {
  const response = await fetch(urls.vote, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resourceId, vote }),
  })

  if (!response.ok) {
    throw new Error('Error fetching votes')
  }
}

export const VoteCounter: FC<TVoteCounter> = ({
  voteCount,
  resourceId,
  handleAccessModal,
}) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const castVote = useMutation({
    mutationFn: updateVote,
    onSuccess: (_, { vote }) => {
      const queryCacheGetResources = queryClient
        .getQueryCache()
        .findAll(['getResources'])

      const queryKeys = queryCacheGetResources.map((q) => q.queryKey)

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

  const handleClick = (vote: 'up' | 'down' | 'cancel') => {
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
