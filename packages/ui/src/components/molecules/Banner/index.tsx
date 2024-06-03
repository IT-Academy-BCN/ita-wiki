import { FC } from 'react'
import styled from 'styled-components'
import { Button, Text, Title } from '../../atoms'
import { FlexBox, colors, dimensions, font } from '../../../styles'
import defaultImg from './defaultImg.svg'

const BannerStyled = styled(FlexBox)<{ size: 'small' | 'normal' }>`
  width: ${({ size }) => (size === 'small' ? '24.5rem' : '34.65rem')};
  height: ${({ size }) => (size === 'small' ? '10.5rem' : '14.65rem')};
  background-color: ${colors.primary};
  border-radius: ${dimensions.borderRadius.base};
  padding: ${dimensions.spacing.md};
`

const InfoStyled = styled(FlexBox)`
  width: 70%;
`

const TitleStyled = styled(Title)`
  margin: 0;
`

const TextStyled = styled(Text)`
  color: ${colors.white};
  margin: 0;
`

const ButtonStyled = styled(Button)`
  background-color: ${colors.black.black1};
  font-weight: ${font.bold};
  font-size: ${({ size }) => (size === 'small' ? font.xss : font.base)};
  padding: ${dimensions.spacing.xs} ${dimensions.spacing.xxxl};
  width: fit-content;
`

const ImageContainer = styled(FlexBox)`
  width: 30%;
`

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${dimensions.borderRadius.base};
  object-fit: cover;
`

export type TBanner = {
  id: string
  title: string
  description: string
  buttonText: string
  imgUrl?: string
  imgAltText: string
  size?: 'small' | 'normal'
  onClick: () => void
}

export const Banner: FC<TBanner> = ({
  id,
  title,
  description,
  buttonText,
  imgUrl = defaultImg,
  imgAltText,
  size = 'normal',
  onClick,
}) => (
  <BannerStyled
    direction="row"
    align="stretch"
    justify="space-between"
    gap={dimensions.spacing.md}
    size={size}
    data-testid={`baner-${id}`}
  >
    <InfoStyled
      align="start"
      justify="space-between"
      gap={dimensions.spacing.xs}
    >
      <TitleStyled
        as={size === 'small' ? 'h2' : 'h1'}
        fontWeight="bold"
        color={colors.white}
      >
        {title}
      </TitleStyled>
      <TextStyled fontSize={size === 'small' ? font.xs : font.base}>
        {description}
      </TextStyled>
      <ButtonStyled
        size={size === 'small' ? 'small' : 'normal'}
        onClick={onClick}
      >
        {buttonText}
      </ButtonStyled>
    </InfoStyled>
    <ImageContainer>
      <ImageStyled src={imgUrl} alt={imgAltText} />
    </ImageContainer>
  </BannerStyled>
)
