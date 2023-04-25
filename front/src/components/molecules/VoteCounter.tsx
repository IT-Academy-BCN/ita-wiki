import styled from 'styled-components'
import { FlexBox, colors } from '../../styles'
import { Icon, Text } from '../atoms'

const StyledIconIncrease = styled(Icon)`
  &:hover {
    color: ${colors.success};
  }
`

function VoteCounter() {
  return (
    <FlexBox>
      <StyledIconIncrease name="expand_less" color={colors.gray.gray3} />
      <Text fontWeight="bold" style={{ marginTop: '0', marginBottom: '0' }}>
        10
      </Text>
      <Icon name="expand_more" color={colors.gray.gray3} />
    </FlexBox>
  )
}

export default VoteCounter
