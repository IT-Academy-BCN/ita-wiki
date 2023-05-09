import { FC, useState } from 'react'
import axios from 'axios'
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

const SmallSpinner = styled(Spinner)`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`

const CategoriesListStyled = styled(FlexBox)`
  padding: 0 ${dimensions.spacing.lg};
  margin-bottom: ${dimensions.spacing.lg};
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
const CategoryLinkStyled = styled.a<TLinkStyled>`
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

// TODO: Remove once we receive img property from the API
const categoryImg: Record<string, string> = {
  React: icons.react,
  Angular: icons.angular,
  Node: icons.node, // TODO: Add Node Icon
  PHP: icons.php, // TODO: Add PHP Icon
  Java: icons.java, // TODO: Add Java Icon
  'Data Science': icons.dataScience,
}

type SetStateAction<S> = S | ((prevState: S) => S)

type TCategory = {
  id: number
  name: string
  resources: number
  topics: number
  img: string
}
/*
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
    */

const getCategories = () => axios.get(urls.getCategories);

export const CategoriesList: FC = () => {
  const [activeCategory, setActiveCategory] = useState('')
  const handleCategoryClick = (cat: SetStateAction<string>) => {
    setActiveCategory(cat)
  }

  const { isLoading, data, error } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
  })

  if (isLoading) return <SmallSpinner />
  if (error) return <p>Ha habido un error...</p>
  return (
    <>
      <MobileStyled>
        <CategoriesListStyled align="stretch">
          <Title as="h3" fontWeight="bold">
            Categorías
          </Title>
          <FlexBox gap="1rem" align="stretch">
            {data?.data.map((category: TCategory) => (
              <CategoryBlock
                key={category.id}
                name={category.name}
                img={categoryImg[category.name]}
              />
            ))}
          </FlexBox>
        </CategoriesListStyled>
      </MobileStyled>
      <DesktopStyled>
        <CategoriesContainerStyled>
          {data?.data.map((category: TCategory) => (
            <FlexBox direction="row" key={category.id}>
              <ImgStyled
                src={categoryImg[category.name]}
                alt={`${category.name} logo`}
              />
              <CategoryLinkStyled
                active={activeCategory === category.name}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </CategoryLinkStyled>
            </FlexBox>
          ))}
        </CategoriesContainerStyled>
      </DesktopStyled>
    </>
  )
}
