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
  voteCount: TVoteCountResponse
  resourceId: string
  handleAccessModal: () => void
}

type TVoteCountResponse = {
  downvote: number
  upvote: number
  total: number
  userVote: number
}

type TVoteMutationData = {
  resourceId: string
  vote: 'up' | 'down' | 'cancel'
}

// const getVotes = async (resourceId: string): Promise<TVoteCountResponse> => {
//   const response = await fetch(`${urls.vote}${resourceId}`)
//   if (!response.ok) {
//     throw new Error('Error fetching votes')
//   }
//   const data = await (response.json() as Promise<TVoteCountResponse>)
//   return data
// }

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
            if (resource.id === resourceId) {
              // UPDATE VOTE COUNT
              if (resource.voteCount.userVote === 0) {
                if (vote === 'up') {
                  return {
                    ...resource,
                    voteCount: {
                      downvote: resource.voteCount.downvote,
                      upvote: resource.voteCount.upvote + 1,
                      total: resource.voteCount.total + 1,
                      userVote: 1,
                    },
                  }
                }

                if (vote === 'down') {
                  return {
                    ...resource,
                    voteCount: {
                      downvote: resource.voteCount.downvote + 1,
                      upvote: resource.voteCount.upvote,
                      total: resource.voteCount.total - 1,
                      userVote: -1,
                    },
                  }
                }
              } else if (resource.voteCount.userVote === 1) {
                if (vote === 'cancel') {
                  return {
                    ...resource,
                    voteCount: {
                      downvote: resource.voteCount.downvote,
                      upvote: resource.voteCount.upvote - 1,
                      total: resource.voteCount.total - 1,
                      userVote: 0,
                    },
                  }
                }
                if (vote === 'down') {
                  return {
                    ...resource,
                    voteCount: {
                      downvote: resource.voteCount.downvote + 1,
                      upvote: resource.voteCount.upvote - 1,
                      total: resource.voteCount.total - 2,
                      userVote: -1,
                    },
                  }
                }
              } else if (resource.voteCount.userVote === -1) {
                if (vote === 'up') {
                  return {
                    ...resource,
                    voteCount: {
                      downvote: resource.voteCount.downvote - 1,
                      upvote: resource.voteCount.upvote + 1,
                      total: resource.voteCount.total + 2,
                      userVote: 1,
                    },
                  }
                }

                if (vote === 'cancel') {
                  return {
                    ...resource,
                    voteCount: {
                      downvote: resource.voteCount.downvote - 1,
                      upvote: resource.voteCount.upvote,
                      total: resource.voteCount.total + 1,
                      userVote: 0,
                    },
                  }
                }
              }
            }
            return resource
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
