import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Text } from '../atoms'
import bgHomeCardCorner from '../../assets/icons/bg-home-card-corner.svg'

const CardContainer = styled(FlexBox)`
  flex-direction: column;
  flex: 1 1 9rem;
  justify-content: flex-start;
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

const IndicatorStyled = styled(FlexBox)`
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
  background: url(${bgHomeCardCorner}) no-repeat;
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

type TCardHome = {
  cardTitle: string
  cardSubtitle: string
  indicator: string
  icon: string
}

export const CardHome = ({
  cardTitle,
  cardSubtitle,
  indicator,
  icon,
}: TCardHome) => (
  <CardContainer>
    <IndicatorStyled direction="row">{indicator}</IndicatorStyled>
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
