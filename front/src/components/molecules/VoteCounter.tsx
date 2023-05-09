import styled from 'styled-components'
import { FC, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
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

const fetcher = async (resourceId: string, voteVaue: string) => {
  const url = urls.vote
    .replace(':resourceId', resourceId)
    .replace(':vote', voteVaue)
  const res = await fetch(url)
  return res.json()
}

const VoteCounter: FC<TVoteCounter> = ({ voteCount, resourceId }) => {
  const newVotation = useMutation({
    mutationKey: ['vote', resourceId],
    mutationFn: (voteValue: string) => fetcher(resourceId, voteValue),
  })

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
