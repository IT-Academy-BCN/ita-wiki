import styled from 'styled-components'
import { FC } from 'react'
import { FlexBox, colors } from '../../styles'
import { Icon, Text } from '../atoms'

const StyledIcon = styled(Icon)<ArrowProp>`
  color: ${({ color }) => color};

  &:hover {
    color: ${({ name }) =>
      (name === 'expand_less' && colors.success) ||
      (name === 'expand_more' && colors.error)};
  }
`

export type ArrowProp = {
  color: string
  disabled: boolean
}

export type TVoteCount = {
  downvote: number
  upvote: number
  total: number
  userVote: number
}

export type TVoteCounter = {
  voteCount: TVoteCount
  onClick: (vote: 'up' | 'down') => void
  disabled: boolean
}

export const VoteCounter: FC<TVoteCounter> = ({ voteCount, onClick, disabled }) => (
  <FlexBox data-testid="voteCounter">
    <StyledIcon as="button"
      name="expand_less"
      data-testid="increase"
      color={voteCount.userVote > 0 ? colors.success : colors.gray.gray3}
      onClick={() => onClick('up')}
      disabled={disabled}
    />
    <Text
      fontWeight="bold"
      style={{ marginTop: '0', marginBottom: '0' }}
      data-testid="voteTest"
    >
      {voteCount.total}
    </Text>
    <StyledIcon as="button"
      name="expand_more"
      id="decrease"
      data-testid="decrease"
      color={voteCount.userVote < 0 ? colors.error : colors.gray.gray3}
      onClick={() => onClick('down')}
      disabled={disabled}
    />
  </FlexBox>
)
