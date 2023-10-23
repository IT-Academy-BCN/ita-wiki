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
    color: ${({ name }) => (name === 'expand_less' && colors.success) || (name === 'expand_more' && colors.error)};
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

export const VoteCounter: FC<TVoteCounter> = ({ voteCount, resourceId, handleAccessModal }) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const updateVoteCount = (currentVoteCount: TVoteCount, vote: TUserVote) => {
    if (currentVoteCount.userVote === 0) {
      return {
        downvote: vote === 'up' ? currentVoteCount.downvote : currentVoteCount.downvote + 1,
        upvote: vote === 'up' ? currentVoteCount.upvote + 1 : currentVoteCount.upvote,
        total: vote === 'up' ? currentVoteCount.total + 1 : currentVoteCount.total - 1,
        userVote: vote === 'up' ? 1 : -1,
      }
    }

    if (currentVoteCount.userVote === 1) {
      return {
        downvote: vote === 'cancel' ? currentVoteCount.downvote : currentVoteCount.downvote + 1,
        upvote: currentVoteCount.upvote - 1,
        total: vote === 'cancel' ? currentVoteCount.total - 1 : currentVoteCount.total - 2,
        userVote: vote === 'cancel' ? 0 : -1,
      }
    }

    if (currentVoteCount.userVote === -1) {
      return {
        downvote: currentVoteCount.downvote - 1,
        upvote: vote === 'up' ? currentVoteCount.upvote + 1 : currentVoteCount.upvote,
        total: vote === 'up' ? currentVoteCount.total + 2 : currentVoteCount.total + 1,

        userVote: vote === 'up' ? 1 : 0,
      }
    }

    return currentVoteCount
  }

  const castVote = useMutation({
    mutationFn: updateVote,
    onSuccess: (_, { vote }) => {
      const queryCacheGetResources = queryClient.getQueryCache().findAll(['getResources'])

      const queryKeys = queryCacheGetResources.map((q) => q.queryKey)

      // the function takes the current vote count + the user's vote and updates voteCount

      for (let i = 0; i < queryKeys.length; i += 1) {
        const queryKey = queryKeys[i]

        queryClient.setQueryData(queryKey, (data?: TResource[]) => {
          const newData = data?.map((resource) => {
            if (resource.id !== resourceId) return resource

            const newVoteCount = updateVoteCount(resource.voteCount, vote)
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

    if (voteCount.userVote === 1 && vote === 'up') {
      castVote.mutate({ resourceId, vote: 'cancel' })
    } else if (voteCount.userVote === -1 && vote === 'down') {
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
      <Text fontWeight="bold" style={{ marginTop: '0', marginBottom: '0' }} data-testid="voteTest">
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
