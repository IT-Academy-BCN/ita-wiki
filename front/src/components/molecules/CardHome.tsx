import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, device, dimensions, font } from '../../styles'
import { Icon, Text } from '../atoms'

const MainContainer = styled(FlexBox)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  margin-bottom: ${dimensions.spacing.lg};
  position: relative;

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
const CircleContainer = styled.div`
  position: absolute;
  border-radius: ${dimensions.borderRadius.sm};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: hidden;
`
type TCircle = HTMLAttributes<HTMLParagraphElement> & {
  backgroundColor?: string
  top?: string
  left?: string
  zIndex: number
}

const CircleStyled = styled.div<TCircle>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translateX(-50%);
  z-index: ${(props) => props.zIndex};

  @media only ${device.Tablet} {
    display: none;
  }
`

const ImgStyled = styled.img`
  height: 5rem;
  z-index: 99;
  position: relative;
  margin: auto ${dimensions.spacing.xxl} auto ${dimensions.spacing.base};

  @media only ${device.Tablet} {
    height: 100px;
    width: 100px;
    z-index: 0;
    margin: ${dimensions.spacing.none};
  }
`
const TitleStyled = styled(Text)`
  margin: ${dimensions.spacing.none};
  font-weight: bold;

  @media only ${device.Tablet} {
    font-weight: normal;
    text-align: center;
    margin: ${dimensions.spacing.xxs} auto;
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
      <CircleContainer>
        <CircleStyled
          backgroundColor={colors.primary}
          left="10px"
          top="-70px"
          zIndex={2}
        />
        <CircleStyled
          backgroundColor={`${colors.primary}7D`}
          left="40px"
          top="-55px"
          zIndex={1}
        />
      </CircleContainer>
      <FlexBoxStyled>
        <TitleStyled>{cardTitle}</TitleStyled>
        <SubtitleStyled>{cardSubtitle}</SubtitleStyled>
      </FlexBoxStyled>
    </ContentContainer>
    <IconStyled name="arrow_forward_ios" color={colors.gray.gray3} />
  </MainContainer>
)
