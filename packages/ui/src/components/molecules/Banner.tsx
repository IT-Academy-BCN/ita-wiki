import { FC } from 'react'
import styled from 'styled-components'
import { Button, Text, Title } from '../atoms'
import { FlexBox } from '../../styles'

const BannerStyled = styled(FlexBox)``

const InfoStyled = styled(FlexBox)``

const TitleStyled = styled(Title)``

const TextStyled = styled(Text)``

const ButtonStyled = styled(Button)``

const ImageStyled = styled.img``

export type TBanner = {
  title: string
  description: string
  buttonText: string
  imgUrl: string
  imgAltText: string
}

export const Banner: FC<TBanner> = ({
  title,
  description,
  buttonText,
  imgUrl,
  imgAltText,
}) => (
  <BannerStyled>
    <InfoStyled>
      <TitleStyled as="h1" fontWeight="bold">
        {title}
      </TitleStyled>
      <TextStyled>{description}</TextStyled>
      <ButtonStyled>{buttonText}</ButtonStyled>
    </InfoStyled>
    <ImageStyled src={imgUrl} alt={imgAltText} />
  </BannerStyled>
)
