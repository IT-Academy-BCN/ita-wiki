import styled from 'styled-components'
import { FlexBox, dimensions } from '../../styles'
import { CategoryBlock } from '../molecules'
import { Title } from '../atoms'

const CategoriesListStyled = styled(FlexBox)`
  padding: 0 ${dimensions.spacing.lg};
  margin-bottom: ${dimensions.spacing.lg};
`
type Tcategory = {
  id: number
  category: string
  resources: number
  topics: number
  img: string
}
type Tcategories = {
  categories: Tcategory[]
}
const CategoriesList = ({ categories }: Tcategories) => (
  <CategoriesListStyled align="stretch">
    <Title as="h3" fontWeight="bold">
      Categorías
    </Title>
    <FlexBox gap="1rem" align="stretch">
      {categories.map((category: Tcategory) => (
        <CategoryBlock
          key={category.id}
          id={category.id}
          img={category.img}
          category={category.category}
          resources={category.resources}
          topics={category.topics}
        />
      ))}
    </FlexBox>
  </CategoriesListStyled>
)

export { CategoriesList }
