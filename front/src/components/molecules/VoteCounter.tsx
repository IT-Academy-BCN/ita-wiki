import styled from 'styled-components'
import { FC } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FlexBox, colors } from '../../styles'
import { Icon, Text } from '../atoms'
import { urls } from '../../constants'
import { useAuth } from '../../context/AuthProvider'

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
  totalVotes: number
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

const getVotes = async (resourceId: string): Promise<TVoteCountResponse> => {
  const response = await fetch(`${urls.vote}${resourceId}`)
  if (!response.ok) {
    throw new Error('Error fetching votes')
  }
  const data = await (response.json() as Promise<TVoteCountResponse>)
  return data
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
  totalVotes,
  resourceId,
  handleAccessModal,
}) => {
  const { user } = useAuth()

  const { data: fetchedVotes, refetch } = useQuery<TVoteCountResponse>(
    ['votes', resourceId],
    () => getVotes(resourceId),
    {
      onError: () => {
        // eslint-disable-next-line no-console
        console.error('Error fetching votes')
      },
    }
  )

  const castVote = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      refetch()
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

    if (fetchedVotes?.userVote === 0) {
      castVote.mutate({ resourceId, vote })
    } else {
      castVote.mutate({ resourceId, vote: 'cancel' })
    }
  }

  return (
    <FlexBox data-testid="voteCounter">
      <StyledIcon
        name="expand_less"
        data-testid="increase"
        color={
          fetchedVotes !== undefined && fetchedVotes.userVote > 0
            ? colors.success
            : colors.gray.gray3
        }
        onClick={() => handleClick('up')}
      />
      <Text
        fontWeight="bold"
        style={{ marginTop: '0', marginBottom: '0' }}
        data-testid="voteTest"
      >
        {fetchedVotes?.total ?? totalVotes}
      </Text>
      <StyledIcon
        name="expand_more"
        id="decrease"
        data-testid="decrease"
        color={
          fetchedVotes !== undefined && fetchedVotes.userVote < 0
            ? colors.error
            : colors.gray.gray3
        }
        onClick={() => handleClick('down')}
      />
    </FlexBox>
  )
}
