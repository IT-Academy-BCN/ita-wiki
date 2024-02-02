import styled from 'styled-components'
import { FlexBox, colors, font, Text } from '@itacademy/ui'

const StyledDiv = styled.div`
  padding-right: 4px;
  margin: 0;
`
const MetaInfo = styled(Text)`
  font-weight: ${font.medium};
  font-size: ${font.xss};
  color: ${colors.gray.gray3};
`
type TCreateAuthor = {
  createdBy: string
  updatedAt: string
  img?: string
}
const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const CreateAuthor = ({ createdBy, updatedAt, img }: TCreateAuthor) => (
  <FlexBox direction="row">
    <StyledDiv>{img ? <img src={img} alt="Author icon" /> : '😺'}</StyledDiv>
    <MetaInfo>
      {createdBy},{' '}
      {new Date(updatedAt).toLocaleDateString('es-ES', dateFormatOption)}
    </MetaInfo>
  </FlexBox>
)
