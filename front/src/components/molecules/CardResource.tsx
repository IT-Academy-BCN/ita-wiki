import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Icon, Text } from '../atoms'

const CardContainerStyled = styled(FlexBox)`
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray3};
  margin: ${dimensions.spacing.xs} auto;
  padding: 0.1rem;
  width: 340px;
  height: 100px;
`

const CounterContainerStyled = styled(FlexBox)`
  margin: 0.5rem 0.7rem 0.7rem 0.7rem;
`

const ArrowLessIcon = styled(Icon)`
  color: ${colors.gray.gray3};
  cursor: pointer;

  &:hover {
    color: ${colors.success};
  }
`
const ArrowMoreIcon = styled(Icon)`
  color: ${colors.gray.gray3};
  cursor: pointer;

  &:hover {
    color: ${colors.error};
  }
`

const CounterStyled = styled(Text)`
  margin: 0rem;
`

const TextStyled = styled(Text)`
  margin: 0rem;
`

const FlexBoxStyled = styled(FlexBox)`
  margin-top: 1rem;
`

const MetaInfo = styled.p`
  font-weight: bold;
  font-size: 10px;
  color: ${colors.gray.gray4};
`
type TCardResource = {
  createdBy: string
  createdOn: string
  title: string
  likes: number
  description: string
}
const CardResource = ({
  likes,
  title,
  description,
  createdBy,
  createdOn,
}: TCardResource) => (
  <CardContainerStyled direction="row" align="start" justify="flex-start">
    {/* Contador */}
    <CounterContainerStyled align="start">
      <ArrowLessIcon name="expand_less" opsz={20} />
      <CounterStyled fontSize={font.xs} fontWeight="bold">
        {likes}
      </CounterStyled>
      <ArrowMoreIcon name="expand_more" />
    </CounterContainerStyled>

    {/* Resto */}
    <FlexBoxStyled align="start" justify="flex-start">
      <TextStyled fontSize={font.xs} fontWeight="bold">
        {title}
      </TextStyled>
      <TextStyled fontSize={font.xss} color={colors.gray.gray3}>
        {description}
      </TextStyled>
      <FlexBox direction="row">
        <TextStyled fontSize={font.xss} color={colors.gray.gray3}>
          Avatar
        </TextStyled>
        <MetaInfo>
          {createdBy},{' '}
          {new Date(createdOn).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </MetaInfo>
      </FlexBox>
    </FlexBoxStyled>
  </CardContainerStyled>
)

export { CardResource }
