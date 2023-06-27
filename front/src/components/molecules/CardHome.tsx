import styled from 'styled-components'
import { FlexBox, colors, device, dimensions, font } from '../../styles'
import { Icon, Text } from '../atoms'

const MainContainer = styled(FlexBox)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  margin-bottom: ${dimensions.spacing.lg};

  @media only ${device.Tablet} {
    flex-direction: column;
    justify-content: justify;
    align-items: flex-end;
    margin: ${dimensions.spacing.base};
  }
`

const ContentContainer = styled(FlexBox)`
  flex-direction: row;
  margin: 0.9rem auto 0.9rem 0;
  gap: ${dimensions.spacing.base};

  @media only ${device.Tablet} {
    flex-direction: column;
    position: relative;
    background-color: ${colors.gray.gray5};
    padding: ${dimensions.spacing.md};
    height: fit-content;
    width: 200px;
    height: 268px;
    border-bottom-left-radius: ${dimensions.borderRadius.base};
    border-bottom-right-radius: ${dimensions.borderRadius.base};
    border-top-left-radius: ${dimensions.borderRadius.base};
    margin: auto;
    gap: ${dimensions.spacing.none};
  }
`
const TopContainter = styled.div`
  @media only ${device.Tablet} {
    background-color: ${colors.gray.gray5};
    height: 30px;
    width: 163px;
    border-top-right-radius: ${dimensions.borderRadius.base};
    border-top-left-radius: ${dimensions.borderRadius.base};
  }
`
const IndicatorStyled = styled(FlexBox)`
  display: none;

  @media only ${device.Tablet} {
    display: block;
    position: absolute;
    min-width: ${dimensions.spacing.xl};
    background-color: ${colors.white};
    padding: ${dimensions.spacing.xxs};
    border-bottom-left-radius: ${dimensions.borderRadius.base};
    border-bottom-right-radius: ${dimensions.borderRadius.base};
    left: -0.1rem;
    top: -1.9rem;
    font-size: ${font.xss};
    color: ${colors.gray.gray3};
  }
`
const ImgStyled = styled.img`
  height: 5rem;

  @media only ${device.Tablet} {
    height: 100px;
    width: 100px;
  }
`
const TitleStyled = styled(Text)`
  margin: ${dimensions.spacing.none};
  font-weight: bold;

  @media only ${device.Tablet} {
    font-weight: normal;
    text-align: center;
    margin: auto;
  }
`
const SubtitleStyled = styled(Text)`
  display: none;

  @media only ${device.Tablet} {
    display: block;
    text-align: center;
    color: ${colors.gray.gray3};
    font-size: ${font.xss};
  }
`

const IconStyled = styled(Icon)`
  margin-right: ${dimensions.spacing.xs};

  @media only ${device.Tablet} {
    display: none;
  }
`

const FlexBoxStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xxs};
  align-items: start;

  @media only ${device.Tablet} {
    align-items: center;
  }
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
  <MainContainer>
    <TopContainter />
    <ContentContainer>
      <IndicatorStyled>{indicator}</IndicatorStyled>
      <ImgStyled alt="icon" src={icon} data-testid="testIcon" />
      <FlexBoxStyled>
        <TitleStyled>{cardTitle}</TitleStyled>
        <SubtitleStyled>{cardSubtitle}</SubtitleStyled>
      </FlexBoxStyled>
    </ContentContainer>
    <IconStyled name="arrow_forward_ios" color={colors.gray.gray3} />
  </MainContainer>
)
