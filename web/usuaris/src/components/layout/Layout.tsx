import styled from 'styled-components'
import { FlexBox, colors } from '@itacademy/ui'

type TLayoutStyled = {
  minHeight: number
  width: number
  color?: string
}

const LayoutStyled = styled(FlexBox)<TLayoutStyled>`
  min-height: ${(props) => props.minHeight}%;
  width: ${(props) => props.width}%;
  color: ${({ color }) => color || colors.gray.gray5};
`

type TLayout = {
  children: React.ReactNode
} & Partial<TLayoutStyled>

export const Layout = ({ children, minHeight = 100, width = 100 }: TLayout) => (
  <LayoutStyled minHeight={minHeight} width={width}>
    {children}
  </LayoutStyled>
)
