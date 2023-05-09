import { FC } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FlexBox, dimensions } from '../../styles'
import { CategoryBlock } from '../molecules'
import { Title } from '../atoms'
import icons from '../../assets/icons'
import { urls } from '../../constants'

const CategoriesListStyled = styled(FlexBox)`
  padding: 0 ${dimensions.spacing.lg};
  margin-bottom: ${dimensions.spacing.lg};
`

// TODO: Remove once we receive img property from the API
const categoryImg: Record<string, string> = {
  React: icons.react,
  Angular: icons.angular,
  Node: icons.javascript, // TODO: Add Node Icon
  PHP: icons.newFolder, // TODO: Add PHP Icon
  Java: icons.newFolder, // TODO: Add Java Icon
  'Data Science': icons.dataScience,
}

type TCategory = {
  id: number
  name: string
  resources: number
  topics: number
  img: string
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
  const { isLoading, data, error } = useQuery<TCategory[]>({
    queryKey: ['getCategories'],
    queryFn: getCategories,
  })
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Ha habido un error...</p>
  return (
    <CategoriesListStyled align="stretch">
      <Title as="h3" fontWeight="bold">
        Categorías
      </Title>
      <FlexBox gap="1rem" align="stretch">
        {data?.map((category) => (
          <CategoryBlock
            key={category.id}
            name={category.name}
            img={categoryImg[category.name]}
          />
        ))}
      </FlexBox>
    </CategoriesListStyled>
  )
}
