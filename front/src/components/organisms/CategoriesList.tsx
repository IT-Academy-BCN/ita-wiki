import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FlexBox, colors, device, dimensions } from '../../styles'
import { CategoryBlock } from '../molecules'
import { Spinner, Title } from '../atoms'
import icons from '../../assets/icons'
import { urls } from '../../constants'

const ImgStyled = styled.img`
  height: 30px;
  margin-right: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.xxl};
`

const MobileStyled = styled.div`
  display: block;
  @media only ${device.Laptop} {
    display: none;
  }
`
const DesktopStyled = styled.div`
  display: none;
  @media only ${device.Laptop} {
    display: block;
  }
`

export const SmallSpinner = styled(Spinner)`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`

const CategoriesListStyled = styled(FlexBox)`
  padding: 0 ${dimensions.spacing.lg};
  margin-bottom: ${dimensions.spacing.lg};
`

const LinkCategory = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
`
const CategoriesContainerStyled = styled(FlexBox)`
  padding-left: ${dimensions.spacing.xxs};
  padding-right: ${dimensions.spacing.xs};
  margin-right: ${dimensions.spacing.sm};
  align-items: flex-start;
  color: ${colors.gray.gray3};
  min-width: 11.5rem;
`
type TLinkStyled = {
  active?: boolean
}
const CategoryStyled = styled.span<TLinkStyled>`
  color: ${({ active }) => (active ? colors.black.black3 : colors.gray.gray3)};
  font-weight: bold;
  margin-top: ${dimensions.spacing.xxl};
  cursor: pointer;

  &::before {
    content: '${({ active }) => (active ? '●' : '')}';
    font-size: larger;
    color: ${colors.primary};
    margin-right: 0.3rem;
  }
`
//@@@ Test dels inks que funcionin: https://stackoverflow.com/questions/70933293/how-to-test-link-using-react-testing-library-and-jest
//BO: https://stackoverflow.com/questions/69878146/how-can-i-test-react-router-with-jest, però versió antiga, MILLOR:
//https:stackoverflow.com/questions/69859509/cannot-read-properties-of-undefined-reading-pathname-when-testing-pages-in

// TODO: Remove once we receive img property from the API
const categoryImg: Record<string, string> = {
  React: icons.react,
  Angular: icons.angular,
  Node: icons.node, // TODO: Add Node Icon
  PHP: icons.php, // TODO: Add PHP Icon
  Java: icons.java, // TODO: Add Java Icon
  'Data Science': icons.dataScience,
}

type TCategory = {
  id: string
  img: string
  name: string
  resources: number
  slug: string
  topics: number
}

const getCategories = () =>
  fetch(urls.getCategories)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching categories: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching categories: ${err.message}`)
    })

export const CategoriesList: FC = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
  })

  const { slug } = useParams()

  if (isLoading) return <SmallSpinner role="status" />
  if (error) return <p>Ha habido un error...</p>
  return (
    <>
      <MobileStyled>
        <CategoriesListStyled align="stretch">
          <Title as="h3" fontWeight="bold">
            Categorías
          </Title>
          <FlexBox gap="1rem" align="stretch">
            {data?.map((category: TCategory) => (
              <CategoryBlock
                key={category.id}
                slug={category.slug}
                name={category.name}
                img={categoryImg[category.name]}
              />
            ))}
          </FlexBox>
        </CategoriesListStyled>
      </MobileStyled>
      <DesktopStyled>
        <CategoriesContainerStyled>
          {data?.map((category: TCategory) => (
            <LinkCategory
              to={`/category/${category.slug}`}
              state={{ name: category.name }}
              key={category.id}
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
      </DesktopStyled>
    </>
  )
}
