import styled from 'styled-components'
import { FC } from 'react'
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
  voteCount: number
  resourceId: string
}

export const voteMutation = async (resourceId: string, voteValue: string) => {
  const url = urls.vote
    .replace(':resourceId', resourceId)
    .replace(':vote', voteValue)
  const data = {
    voteCount: voteValue,
    resourceId,
  }
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return fetch(url, requestOptions)
    .then((res) => {
      if (!res.ok) {
        throw new Error('error fetching votes')
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`${err}`)
    })
}

export const VoteCounter: FC<TVoteCounter> = ({ voteCount, resourceId }) => {
  const newVotation = useMutation({
    mutationKey: ['vote', resourceId],
    mutationFn: (voteValue: string) => voteMutation(resourceId, voteValue),
  })

  const handleClick = (voteValue: number) => {
    newVotation.mutate(voteValue.toString())
  }

  if (newVotation.error) {
    return <p data-testid="voteError">{`${newVotation.error}`}</p>
  }

  return (
    <FlexBox data-testid="voteCounter">
      <StyledIcon
        name="expand_less"
        data-testid="increase"
        onClick={() => handleClick(1)}
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
        onClick={() => handleClick(-1)}
      />
    </FlexBox>
  )
}
