import styled from 'styled-components'
import { FlexBox, colors, font } from '../../styles'
import { Text } from '../atoms'

const TextStyled = styled(Text)`
  margin: 0.2rem;
`
const MetaInfo = styled(Text)`
  font-weight: bold;
  font-size: 10px;
  color: ${colors.gray.gray4};
`

type TCreateAuthor = {
  createdBy: string
  createdOn: string
  img?: string
}

const dateFormatOption: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const CreateAuthor = ({ createdBy, createdOn, img }: TCreateAuthor) => (
  <FlexBox direction="row">
    <TextStyled fontSize={font.xss} color={colors.gray.gray3}>
      {img ? <img src={img} alt="Author icon" /> : '😺'}
    </TextStyled>
    <MetaInfo>
      {createdBy},{' '}
      {new Date(createdOn).toLocaleDateString('es-ES', dateFormatOption)}
    </MetaInfo>
  </FlexBox>
)
