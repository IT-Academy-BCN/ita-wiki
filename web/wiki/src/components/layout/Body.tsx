import styled from 'styled-components'
import { FlexBox, colors } from '@itacademy/ui'

type TBodyStyled = {
  minHeight: number
  width: number
  color?: string
}

const BodyStyled = styled(FlexBox)<TBodyStyled>`
  min-height: ${(props) => props.minHeight}%;
  width: ${(props) => props.width}%;
  color: ${({ color }) => color || colors.gray.gray5};
`

type TBody = {
  children: React.ReactNode
} & Partial<TBodyStyled>

function Body({ children, minHeight = 100, width = 100 }: TBody) {
  return (
    <BodyStyled minHeight={minHeight} width={width}>
      {children}
    </BodyStyled>
  )
}

export default styled(Body)``
