import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Icon, Text } from '../atoms'
import { AvatarInfo } from './AvatarInfo'

const CardContainerStyled = styled(FlexBox)`
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray3};
  height: 100px;
  margin: ${dimensions.spacing.xs} auto;
  padding: 0.1rem;
  width: 340px;
`

const CounterContainerStyled = styled(FlexBox)`
  margin: ${dimensions.spacing.xxxs} 0.8rem ${dimensions.spacing.xs};

  ${Text} {
    margin: 0rem;
  }
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

const FlexBoxStyled = styled(FlexBox)`
  margin-top: 1rem;

  ${FlexBox} {
    margin-left: 0.3rem;
  }

  ${Text} {
    margin: 0rem;
  }
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
      <Text fontSize={font.xs} fontWeight="bold">
        {likes}
      </Text>
      <ArrowMoreIcon name="expand_more" />
    </CounterContainerStyled>

    <FlexBoxStyled align="start" justify="flex-start">
      <FlexBox align="start">
        <Text fontSize={font.xs} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize={font.xss} color={colors.gray.gray3}>
          {description}
        </Text>
      </FlexBox>
      <AvatarInfo createdBy={createdBy} createdOn={createdOn} img={img} />
    </FlexBoxStyled>
  </CardContainerStyled>
)

export { CardResource }
