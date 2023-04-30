import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Text } from '../atoms'

// TODO: this component should be combined with CardResource.tsx
// the difference here you can not vote

const CardContainerStyled = styled(FlexBox)`
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray4};
  margin-bottom: ${dimensions.spacing.xs};
  padding: 0.8rem;
  min-width: fit-content;
`

const TextStyled = styled(Text)`
  margin: 0.2rem;
`

const FlexBoxStyled = styled(FlexBox)`
  margin-top: 0.5rem;
`

const MetaInfo = styled.p`
  font-weight: bold;
  font-size: 10px;
  color: ${colors.gray.gray4};
`
type TCardResourceHome = {
  createdBy: string
  createdOn: string
  title: string
  description: string
}
const CardResourceHome = ({
  title,
  description,
  createdBy,
  createdOn,
}: TCardResourceHome) => (
  <CardContainerStyled direction="row" align="start" justify="flex-start">
    <FlexBoxStyled align="start" justify="flex-start">
      <TextStyled fontSize={font.xs} fontWeight="bold">
        {title}
      </TextStyled>
      <TextStyled fontSize={font.xss} color={colors.gray.gray3}>
        {description}
      </TextStyled>
      <FlexBox direction="row">
        <TextStyled fontSize={font.xss} color={colors.gray.gray3}>
          😺
        </TextStyled>
        <MetaInfo>
          {createdBy},{' '}
          {new Date(createdOn).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </MetaInfo>
      </FlexBox>
    </FlexBoxStyled>
  </CardContainerStyled>
)

export { CardResourceHome }
