import styled from 'styled-components'
import { FC } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FlexBox, colors } from '../../styles'
import { Icon, Text } from '../atoms'
import { urls } from '../../constants'
import { useAuth } from '../../context/AuthProvider'

const StyledIcon = styled(Icon)`
  color: ${colors.gray.gray3};
  &:hover {
    color: ${({ name }) =>
      (name === 'expand_less' && colors.success) ||
      (name === 'expand_more' && colors.error)};
  }
`

type TVoteCounter = {
  voteCount: number
  resourceId: string
  handleAccessModal: () => void
}

type TVoteCountResponse = {
  voteCount: {
    downvote: number
    upvote: number
    total: number
  }
}

type TVoteMutationData = {
  resourceId: string
  vote: 'up' | 'down' | 'cancel'
}

const getVotes = async (resourceId: string): Promise<number> => {
  const response = await fetch(`${urls.vote}${resourceId}`)
  if (!response.ok) {
    throw new Error('Error fetching votes')
  }
  const data = await (response.json() as Promise<TVoteCountResponse>)
  return data.voteCount.total
}

const voteMutation = async ({ resourceId, vote }: TVoteMutationData) => {
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

  const { data = voteCount, refetch } = useQuery<number>(
    ['votes', resourceId],
    () => getVotes(resourceId),
    {
      enabled: false,
      onError: () => {
        // eslint-disable-next-line no-console
        console.error('Error fetching votes')
      },
    }
  )
  const newVotation = useMutation({
    mutationFn: voteMutation,
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
    newVotation.mutate({ resourceId, vote })
  }

  return (
    <FlexBox data-testid="voteCounter">
      <StyledIcon
        name="expand_less"
        data-testid="increase"
        onClick={() => handleClick('up')}
      />
      <Text
        fontWeight="bold"
        style={{ marginTop: '0', marginBottom: '0' }}
        data-testid="voteTest"
      >
        {data}
      </Text>
      <StyledIcon
        name="expand_more"
        id="decrease"
        data-testid="decrease"
        onClick={() => handleClick('down')}
      />
    </FlexBox>
  )
}
