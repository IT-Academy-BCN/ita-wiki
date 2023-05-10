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
  voteCount: string
  resourceId: string
}

const fetcher = async (resourceId: string, voteValue: string) => {
  const url = urls.vote
    .replace(':resourceId', resourceId)
    .replace(':vote', voteValue)

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('error fetching votes')
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`error fetching votes: ${err.message}`)
    })
}

const VoteCounter: FC<TVoteCounter> = ({ voteCount, resourceId }) => {
  const newVotation = useMutation({
    mutationKey: ['vote', resourceId],
    mutationFn: (voteValue: string) => fetcher(resourceId, voteValue),
  })

  if (newVotation.isError)
    return <p data-testid="voteError">Ha habido un error</p>

  const handleClick = (voteValue: number) => {
    newVotation.mutate(voteValue.toString())
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

export default VoteCounter
