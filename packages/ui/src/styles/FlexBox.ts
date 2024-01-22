import styled from 'styled-components'

export type TFlexBox = {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'stretch' | 'center' | 'start' | 'end' | 'baseline'
  gap?: string
}

export const FlexBox = styled.div.withConfig<TFlexBox>(
{ shouldForwardProp: (prop) => !['direction', 'justify', 'align', 'gap']
.includes(prop) })<TFlexBox>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
  gap: ${({ gap }) => gap || '0'};
`
