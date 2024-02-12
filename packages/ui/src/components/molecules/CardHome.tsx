import { FC } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Text } from '../atoms'

const CardContainer = styled(FlexBox)`
  flex: 1 1 9rem;
  position: relative;
  max-width: 17.5rem;
  min-width: 9rem;
  height: 100%;
  min-height: 20rem;
  background-color: ${colors.gray.gray5};
  border-radius: ${dimensions.borderRadius.base};
  overflow: hidden;
  padding: ${dimensions.spacing.md};
`

type CardHomeProp = Pick<TCardHome, 'backgroundImg'>

const IndicatorStyled = styled(FlexBox)<CardHomeProp>`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 59px;
  height: 59px;
  padding-right: ${dimensions.spacing.xxs};
  padding-bottom: ${dimensions.spacing.xxs};
  font-size: ${font.xss};
  font-weight: ${font.regular};
  color: ${colors.gray.gray3};
  font-family: ${font.fontFamily};
  background: ${({ backgroundImg }) => `url(${backgroundImg}) no-repeat`};
`

const ImgStyled = styled.img`
  height: 6rem;
  margin: ${dimensions.spacing.md} ${dimensions.spacing.xs}
    ${dimensions.spacing.sm} ${dimensions.spacing.xs};
`

const TitleStyled = styled(Text)`
  margin: ${dimensions.spacing.none};
  line-height: 1.5rem;
  text-align: center;
  white-space: pre-wrap;
  font-weight: ${font.medium};
  margin: ${dimensions.spacing.xxs} auto 0 auto;
`

const SubtitleStyled = styled(Text)`
  text-align: center;
  font-weight: ${font.regular};
  line-height: 1.3rem;
`
export type TCardHome = {
  cardTitle: string
  cardSubtitle: string
  indicator: string
  icon: string
  backgroundImg: string
}
export const CardHome: FC<TCardHome> = ({
  cardTitle,
  cardSubtitle,
  indicator,
  icon,
  backgroundImg,
}: TCardHome) => (
  <CardContainer justify="flex-start">
    <IndicatorStyled direction="row" backgroundImg={backgroundImg}>
      {indicator}
    </IndicatorStyled>
    <ImgStyled alt="" src={icon} data-testid="testIcon" />
    <FlexBox justify="flex-start">
      <TitleStyled as="h2" fontSize="18px">
        {cardTitle}
      </TitleStyled>
      <SubtitleStyled color={`${colors.gray.gray3}`} fontSize={`${font.base}`}>
        {cardSubtitle}
      </SubtitleStyled>
    </FlexBox>
  </CardContainer>
)
