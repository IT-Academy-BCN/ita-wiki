import styled from 'styled-components'
import { FC, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { FlexBox, colors } from '../../styles'
import { Icon, Text } from '../atoms'
import { urls } from '../../constants'

const StyledIcon = styled(Icon)`
  color: ${colors.gray.gray3};
  &:hover {
    color: ${({ name }) =>
      (name === 'expand_less' && colors.success) ||
      (name === 'expand_more' && colors.error)};
  }
`

type TVoteCounter = {
  vote: string
  resourceId: string
}

const fetcher = async (resourceId: string, vote: string) => {
  const url = urls.vote
    .replace(':resourceId', resourceId)
    .replace(':vote', vote)
  const res = await fetch(url)
  return res.json()
}

const VoteCounter: FC<TVoteCounter> = ({ vote, resourceId }) => {
  const [newVote, setNewVote] = useState(Number(vote))

  const newVotation = useMutation({
    mutationKey: ['vote', 'resourceId'],
    mutationFn: () => fetcher(resourceId, vote),
  })

  const handleIncrease = async () => {
    const res = await newVotation
    setNewVote(newVote + 1)
    console.log(res)
  }

  const handleDecrease = () => {}

  return (
    <FlexBox data-testid="voteCounter">
      <StyledIcon
        name="expand_less"
        onClick={handleIncrease}
        data-testid="increase"
      />
      <Text
        fontWeight="bold"
        style={{ marginTop: '0', marginBottom: '0' }}
        data-testid="voteTest"
      >
        {vote}
      </Text>
      <StyledIcon
        name="expand_more"
        id="decrease"
        onClick={handleDecrease}
        data-testid="decrease"
      />
    </FlexBox>
  )
}

export default VoteCounter
