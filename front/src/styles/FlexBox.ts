import styled from 'styled-components'

type TFlexBox = {
  direction?: string
  justify?: string
  align?: string
}

export const FlexBox = styled.div<TFlexBox>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
`

