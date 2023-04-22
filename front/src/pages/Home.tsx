import styled from 'styled-components'
import { FC } from 'react'

import icons from '../assets/icons'
import { FlexBox, colors, dimensions } from '../styles'
import { InputGroup } from '../components/molecules'
import {
  HowToHelpCard,
  CategoriesList,
  ResourcesList,
} from '../components/organisms'

type Tcategories = {
  id: number
  category: string
  resources: number
  topics: number
  img: string
}

type Tresource = {
  id: number
  title: string
  createdBy: string
  createdOn: string
  description: string
}
const categories: Tcategories[] = [
  {
    id: 1,
    img: icons.angular,
    resources: 49,
    category: 'Angular',
    topics: 6,
  },
  {
    id: 2,
    img: icons.react,
    category: 'React',
    resources: 65,
    topics: 7,
  },
  {
    id: 3,
    img: icons.vue,
    category: 'Vue',
    resources: 32,
    topics: 8,
  },
  {
    id: 4,
    img: icons.javascript,
    category: 'Javascript',
    resources: 44,
    topics: 3,
  },
  {
    id: 5,
    img: icons.dataScience,
    category: 'Data Science',
    resources: 23,
    topics: 1,
  },
]

const resources: Tresource[] = [
  {
    id: 1,
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
  },
  {
    id: 2,
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
  },
  {
    id: 3,
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
  },
  {
    id: 4,
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
  },
]

const HeaderContainerStyled = styled(FlexBox)`
  padding: ${dimensions.spacing.lg} ${dimensions.spacing.lg} 0
    ${dimensions.spacing.lg};
  align-items: stretch;
  gap: ${dimensions.spacing.base};
`
const StyledInputGroup = styled(InputGroup)``
const GrayBackground = styled.div`
  z-index: -9999;
  position: absolute;
  width: 100%;
  height: 155px;
  background-color: ${colors.gray.gray5};
`

const Home: FC = () => (
  <>
    <GrayBackground />
    <HeaderContainerStyled>
      <HowToHelpCard />
      <StyledInputGroup
        label="Buscar"
        placeholder="¿Buscas un tema en concreto?"
        id="search"
        name="search"
        icon="search"
        color={colors.gray.gray3}
      />
    </HeaderContainerStyled>
    <CategoriesList categories={categories} />
    <ResourcesList title="Recursos que te gustan" resources={resources} />
    <ResourcesList title="Tus recursos" resources={resources} />
  </>
)

export { Home }
