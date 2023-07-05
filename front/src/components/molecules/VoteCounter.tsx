import styled from 'styled-components'
import { FC, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
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

type TVoteMutationData = {
  resourceId: string
  vote: 'up' | 'down' | 'cancel'
}

export const VoteCounter: FC<TVoteCounter> = ({
  voteCount: initialVoteCount,
  resourceId,
  handleAccessModal,
}) => {
  const { user } = useAuth()
  const [voteCount, setVoteCount] = useState(initialVoteCount)

  const voteMutation = async ({ resourceId, vote }: TVoteMutationData) => {
    const url = urls.vote
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId, vote }),
    }

    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('Error fetching votes')
    }

    setVoteCount((prevVoteCount) => {
      if (vote === 'up') {
        return prevVoteCount + 1
      } else if (vote === 'down') {
        return prevVoteCount - 1
      }
      return prevVoteCount
    })
  }
  const newVotation = useMutation(voteMutation)
  const handleClick = (vote: 'up' | 'down' | 'cancel') => {
    newVotation.mutate({ resourceId, vote })
  }
  return (
    <FlexBox data-testid="voteCounter">
      <StyledIcon
        name="expand_less"
        data-testid="increase"
        onClick={user ? () => handleClick('up') : () => handleAccessModal()}
      />
      <Text
        fontWeight="bold"
        style={{ marginTop: '0', marginBottom: '0' }}
        data-testid="voteTest"
      >
        {voteCount}
      </Text>
      <StyledIcon
        name="expand_more"
        id="decrease"
        data-testid="decrease"
        onClick={user ? () => handleClick('down') : () => handleAccessModal()}
      />
    </FlexBox>
  )
}
