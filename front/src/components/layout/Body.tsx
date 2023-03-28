import styled from 'styled-components'
import { FlexBox } from '../../styles'

type TBodyStyled = {
  minHeight: number
  width: number
}

const BodyStyled = styled(FlexBox)<TBodyStyled>`
  min-height: 100vh;
  width: 100vw;
`

type TBody = {
  children: string
}

function Body({ children }: TBody) {
  return <BodyStyled>{children}</BodyStyled>
}

export default Body
