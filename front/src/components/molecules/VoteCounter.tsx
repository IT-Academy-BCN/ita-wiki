import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
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

// TODO: call to API to put the votes
// TODO: are this votes personal or general?
type TVoteCounter = {
  vote: number
  resourceId: string
}

const VoteCounter: React.FC<TVoteCounter> = ({ vote = 0, resourceId }) => {
  const [, setVote] = useState(0)
  const url = `https://dev.api.itadirectory.eurecatacademy.org/api/v1/resources/vote/${resourceId}/${vote}`

  useEffect(() => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote }),
    }

    fetch(url, requestOptions).then(async (res) => {
      const data = await res.json()
      setVote(data)
      console.log('data', data)
    })
  }, [url, vote])

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
