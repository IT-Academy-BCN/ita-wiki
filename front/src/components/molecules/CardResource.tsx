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
  margin: ${dimensions.spacing.xxxs} 0.8rem ${dimensions.spacing.xs};
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

const TextContainerStyled = styled(FlexBox)`
  margin-left: 0.3rem;
`

const AvatarContainerStyled = styled(FlexBox)`
  margin-top: ${dimensions.spacing.sm};
`

type TCardResource = {
  createdBy: string
  createdOn: string
  description: string
  img: string
  likes: number
  title: string
}
const CardResource = ({
  createdBy,
  createdOn,
  description,
  img,
  likes,
  title,
}: TCardResource) => (
  <CardContainerStyled direction="row" align="start" justify="flex-start">
    <CounterContainerStyled align="start">
      <ArrowLessIcon name="expand_less" opsz={20} />
      <CounterStyled fontSize={font.xs} fontWeight="bold">
        {likes}
      </CounterStyled>
      <ArrowMoreIcon name="expand_more" />
    </CounterContainerStyled>

    <FlexBoxStyled align="start" justify="flex-start">
      <TextContainerStyled align="start">
        <TextStyled fontSize={font.xs} fontWeight="bold">
          {title}
        </TextStyled>
        <TextStyled fontSize={font.xss} color={colors.gray.gray3}>
          {description}
        </TextStyled>
      </TextContainerStyled>
      <AvatarContainerStyled direction="row">
        <img src={img} alt="Avatar icon" />
        <TextStyled
          fontWeight="bold"
          color={colors.gray.gray4}
          fontSize={font.xss}
        >
          {createdBy},{' '}
          {new Date(createdOn).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </TextStyled>
      </AvatarContainerStyled>
    </FlexBoxStyled>
  </CardContainerStyled>
)

export { CardResource }
