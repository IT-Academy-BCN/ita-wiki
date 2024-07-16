import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  FlexBox,
  colors,
  device,
  dimensions,
  font,
  Spinner,
} from '@itacademy/ui'
import icons from '../../assets/icons'
import { TCategory, TLinkStyled } from '../../types'
import { useListCategories } from '../../openapi/openapiComponents'

const ImgStyled = styled.img`
  height: 30px;
  margin-right: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.lg};
`

const SpinnerStyled = styled(Spinner)`
  margin: 0 auto;
`

const LinkCategory = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
`

const CategoriesContainerStyled = styled(FlexBox)`
  align-items: flex-start;
  color: ${colors.gray.gray3};
  min-width: 10rem;

  @media ${device.Laptop} {
    margin-right: ${dimensions.spacing.sm};
  }
`

const CategoryStyled = styled.span<TLinkStyled>`
  color: ${({ active }) => (active ? colors.black.black3 : colors.gray.gray3)};
  font-size: ${font.xs};
  font-weight: 600;
  font-family: ${font.fontFamily};
  margin-top: ${dimensions.spacing.lg};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    color: ${({ active }) => (active ? colors.black.black3 : colors.primary)};
    transform: scale(1.05);
  }

  &::before {
    content: '${({ active }) => (active ? '●' : '')}';
    font-size: larger;
    color: ${colors.primary};
    margin-right: 0.3rem;
  }
`

// TODO: Remove once we receive img property from the API
const categoryImg: Record<string, string> = {
  Angular: icons.angular,
  'Data Science': icons.dataScience,
  Java: icons.java, // TODO: Add Java Icon
  Javascript: icons.javascript, // TODO: Add Javascript Icon
  Node: icons.node, // TODO: Add Node Icon
  'Fullstack PHP': icons.php, // TODO: Add PHP Icon
  React: icons.react, // TODO: Add React Icon
  BBDD: icons.bbdd, // TODO: Add BBDD Icon
}

export const CategoriesList: FC = () => {
  const { isLoading, error, data } = useListCategories({})
  const { slug } = useParams()

  if (isLoading) return <SpinnerStyled size="medium" role="status" />
  if (error) return <p>Ha habido un error...</p>
  return (
    <div>
      <CategoriesContainerStyled>
        {data?.map((category: TCategory) => (
          <LinkCategory
            to={`/category/${category.slug}`}
            state={{ name: category.name, id: category.id }}
            key={category.id}
            data-testid={category.name}
          >
            <FlexBox direction="row">
              <ImgStyled
                src={categoryImg[category.name]}
                alt={`${category.name} logo`}
              />
              <CategoryStyled active={slug === category.slug}>
                {category.name}
              </CategoryStyled>
            </FlexBox>
          </LinkCategory>
        ))}
      </CategoriesContainerStyled>
    </div>
  )
}
