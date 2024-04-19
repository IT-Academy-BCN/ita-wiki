import styled, { css } from 'styled-components'
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

  ${({disabled}) => 
    disabled && css`
    pointer-events: none;
    opacity: 0.5;
  `
  }
`

export type ArrowProp = {
  color: string
  disabled?: boolean
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
  disabledUp?: boolean
  disabledDown?: boolean
}

export const VoteCounter: FC<TVoteCounter> = ({ voteCount, onClick, disabledUp, disabledDown }) => (
  <FlexBox data-testid="voteCounter">
    <StyledIcon
      name="expand_less"
      data-testid="increase"
      className={disabledUp ? 'disabled' : ''}
      color={voteCount.userVote > 0 ? colors.success : colors.gray.gray3}
      onClick={() => onClick('up')}
      disabled={disabledUp}
    />
    <Text
      fontWeight="bold"
      style={{ marginTop: '0', marginBottom: '0' }}
      data-testid="voteTest"
    >
      {voteCount.total}
    </Text>
    <StyledIcon
      name="expand_more"
      id="decrease"
      className={disabledDown ? 'disabled' : ''}
      data-testid="decrease"
      color={voteCount.userVote < 0 ? colors.error : colors.gray.gray3}
      onClick={() => onClick('down')}
      disabled={disabledDown}
    />
  </FlexBox>
  )
