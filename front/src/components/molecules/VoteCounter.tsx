import styled from 'styled-components'
import React, { useState } from 'react'
import { FlexBox, colors } from '../../styles'
import { Icon, Text } from '../atoms'

const StyledIcon = styled(Icon)`
  color: ${colors.gray.gray3};
  &:hover {
    color: ${({ name }) =>
      (name === 'expand_less' && colors.success) ||
      (name === 'expand_more' && colors.error)};
  }
`

// TODO: call to API to post the votes
// TODO: are this votes personal or general?
type TVoteCounter = {
  vote: number
}

const VoteCounter: React.FC<TVoteCounter> = ({ vote = 0 }) => {
  const [, setVote] = useState(0)

  const handleIncrease = () => {
    setVote(vote + 1)
  }

  const handleDecrease = () => {
    setVote(vote - 1)
  }

  return (
    <FlexBox data-testid="voteCounter">
      <StyledIcon
        name="expand_less"
        onClick={handleIncrease}
        data-testid="increase"
      />
      <Text fontWeight="bold" style={{ marginTop: '0', marginBottom: '0' }}>
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
