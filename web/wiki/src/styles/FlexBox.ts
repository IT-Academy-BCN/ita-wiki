import styled from 'styled-components'
import type { TFlexBox } from '../types'

export const FlexBox = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['direction', 'justify', 'align', 'gap'].includes(prop),
})<TFlexBox>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
  gap: ${({ gap }) => gap || '0'};
`
