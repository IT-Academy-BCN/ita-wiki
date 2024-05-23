import { FC } from 'react'
import styled from 'styled-components'
import { Button, Text, Title } from '../../atoms'
import { FlexBox, colors, dimensions } from '../../../styles'
import defaultImg from './defaultImg.svg'

const BannerStyled = styled(FlexBox)`
  width: 34.65rem;
  height: auto;
  background-color: ${colors.primary};
  border-radius: ${dimensions.borderRadius.base};
  padding: ${dimensions.spacing.lg};
`

const InfoStyled = styled(FlexBox)`
  width: 24.5rem;
`

const TitleStyled = styled(Title)`
  font-size: 32px;
  margin-top: ${dimensions.spacing.xxxs};
  margin-bottom: 0;
`

const TextStyled = styled(Text)`
  color: ${colors.white};
  margin: 0;
`

const ButtonStyled = styled(Button)`
  background-color: #1e1e1e;
  width: 11rem;
  font-weight: 700;
  font-size: 16px;
`

const ImageContainer = styled(FlexBox)`
  width: 33%;
  height: auto;
`

const ImageStyled = styled.img`
  width: 100%;
  border-radius: ${dimensions.borderRadius.base};
  object-fit: cover;
`

export type TBanner = {
  title: string
  description: string
  buttonText: string
  imgUrl?: string
  imgAltText?: string
  onClick: () => void
}

export const Banner: FC<TBanner> = ({
  title,
  description,
  buttonText,
  imgUrl = defaultImg,
  imgAltText = 'e-book',
  onClick,
}) => (
  <BannerStyled direction="row" align="stretch" gap={dimensions.spacing.xs}>
    <InfoStyled
      align="start"
      justify="space-between"
      gap={dimensions.spacing.md}
    >
      <TitleStyled as="h1" fontWeight="bold" color={colors.white}>
        {title}
      </TitleStyled>
      <TextStyled fontSize="16px">{description}</TextStyled>
      <ButtonStyled onClick={onClick}>{buttonText}</ButtonStyled>
    </InfoStyled>
    <ImageContainer>
      <ImageStyled src={imgUrl} alt={imgAltText} />
    </ImageContainer>
  </BannerStyled>
)
