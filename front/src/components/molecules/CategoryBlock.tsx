import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Icon, Text, Title } from '../atoms'

const CategoryBlockStyled = styled(FlexBox)`
  border: 1px solid ${colors.gray.gray4};
  border-radius: ${dimensions.borderRadius.sm};
`
const ContentStyled = styled(FlexBox)`
  margin: 0.9rem;
  gap: ${dimensions.spacing.base};
`
const ImgStyled = styled.img`
  height: 3rem;
`
const FlexBoxStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xxs};
`
const TitleStyled = styled(Title)`
  margin: ${dimensions.spacing.none};
`
const IconStyled = styled(Icon)`
  margin-right: ${dimensions.spacing.xs};
`

type TCategoryBlock = {
  img?: string
  category?: string
  resources?: number
  topics?: number
}

const CategoryBlock = ({
  img,
  category = 'Unknow',
  resources = 0,
  topics = 0,
}: TCategoryBlock) => (
  <CategoryBlockStyled direction="row" justify="space-between">
    <ContentStyled direction="row">
      <ImgStyled src={img} alt="logo" />
      <FlexBoxStyled align="start">
        <TitleStyled as="h3" fontWeight="bold">
          {category}
        </TitleStyled>
        <Text as="span" color={colors.gray.gray3} fontSize={font.xss}>
          {resources} Recursos · {topics} Temas
        </Text>
      </FlexBoxStyled>
    </ContentStyled>
    <IconStyled name="arrow_forward_ios" color={colors.gray.gray3} />
  </CategoryBlockStyled>
)

export { CategoryBlock }
