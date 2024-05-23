import { FC } from 'react'
import styled from 'styled-components'
import { Button, Text, Title } from '../../atoms'
import { FlexBox, colors, dimensions } from '../../../styles'
import defaultImg from './defaultImg.svg'

const BannerStyled = styled(FlexBox)`
  width: 36.4rem;
  height: 16.2rem;
  background-color: ${colors.primary};
  padding: ${dimensions.spacing.sm};
  border-radius: ${dimensions.borderRadius.base};
`

const InfoStyled = styled(FlexBox)`
  width: 24.5rem;
`

const TitleStyled = styled(Title)``

const TextStyled = styled(Text)`
  color: ${colors.white};
`

const ButtonStyled = styled(Button)`
  background-color: #1e1e1e;
  width: 11rem;
`

const ImageContainer = styled(FlexBox)`
  width: 33%;
`

const ImageStyled = styled.img`
  width: 100%;
  border-radius: ${dimensions.borderRadius.xs};
`

export type TBanner = {
  title: string
  description: string
  buttonText: string
  imgUrl?: string
  imgAltText?: string
}

export const Banner: FC<TBanner> = ({
  title,
  description,
  buttonText,
  imgUrl = defaultImg,
  imgAltText = 'e-book',
}) => (
  <BannerStyled direction="row" justify="center" gap={dimensions.spacing.sm}>
    <InfoStyled align="start">
      <TitleStyled as="h1" fontWeight="bold" color={colors.white}>
        {title}
      </TitleStyled>
      <TextStyled fontSize="16px">{description}</TextStyled>
      <ButtonStyled>{buttonText}</ButtonStyled>
    </InfoStyled>
    <ImageContainer>
      <ImageStyled src={imgUrl} alt={imgAltText} />
    </ImageContainer>
  </BannerStyled>
)
