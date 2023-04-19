/* eslint-disable array-callback-return */
import { FC } from 'react'
import styled from 'styled-components'
import { Text, Title } from '../components/atoms'
import icons from '../assets/icons'
import { FlexBox, colors, dimensions, font } from '../styles'
import { InputGroup } from '../components/molecules'

type Tcategories = {
  id: number
  stack: string
  resource: number
  theme: number
  img: string
}

const categories: Tcategories[] = [
  {
    id: 1,
    img: icons.angular,
    resource: 49,
    stack: 'Angular',
    theme: 6,
  },
  {
    id: 2,
    img: icons.react,
    stack: 'React',
    resource: 65,
    theme: 7,
  },
  {
    id: 3,
    img: icons.vue,
    stack: 'Vue',
    resource: 32,
    theme: 8,
  },
  {
    id: 4,
    img: icons.javascript,
    stack: 'Javascript',
    resource: 44,
    theme: 3,
  },
  {
    id: 5,
    img: icons.dataScience,
    stack: 'Data Science',
    resource: 44,
    theme: 3,
  },
]

const HeaderContainerStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  padding-top: 5rem;
`

const CardStyled = styled(FlexBox)`
  padding-left: 0.5rem;
  margin: 1rem 2rem;
  border: 1px solid ${colors.gray.gray3};
  border-radius: ${dimensions.borderRadius.sm};
  width: 350px;
  height: 75px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${colors.gray.gray1};
  }
`

const ImageContainerStyled = styled.div`
  padding: 0.5rem;
`

const TextContainerStyled = styled(FlexBox)`
  /* padding-left: 0.5rem; */
  gap: 0.25rem;
  margin: 0rem 0.5rem;
`

const TitleStyled = styled(Title)`
  margin: 0rem;
`
const FlexBoxStyled = styled(FlexBox)`
  gap: 0.5rem;
`

const Category: FC = () => (
  <>
    <HeaderContainerStyled>
      <FlexBox direction="row">
        <img src={icons.newFolder} alt="New folder" className="w-2/3" />
        <Text fontWeight="bold"> ¿Cómo colaborar en la wiki?</Text>
      </FlexBox>
      <InputGroup
        label="Buscar"
        placeholder="¿Buscas un tema en concreto?"
        id="search"
        name="search"
        icon="search"
        color={colors.gray.gray4}
      />
    </HeaderContainerStyled>
    <Text fontWeight="bold">Categorías</Text>

    {categories.map((c) => {
      console.log('categories', c)
      return (
        <CardStyled direction="row" justify="space-between" key={c.id}>
          <FlexBox direction="row">
            <div>
              <ImageContainerStyled>
                <img src={c.img} alt={`${c.stack}-logo`} width="50px" />
              </ImageContainerStyled>
            </div>
            <TextContainerStyled align="baseline" justify="space-evenly">
              <TitleStyled as="h3" fontWeight="bold">
                {c.stack}
              </TitleStyled>
              <FlexBoxStyled direction="row">
                <Text
                  fontWeight="bold"
                  color={colors.gray.gray4}
                  fontSize={font.xss}
                >
                  {c.resource} Recursos
                </Text>
                <Text
                  fontWeight="bold"
                  color={colors.gray.gray4}
                  fontSize={font.xss}
                >
                  -
                </Text>
                <Text
                  fontWeight="bold"
                  color={colors.gray.gray4}
                  fontSize={font.xss}
                >
                  {c.theme} Temas
                </Text>
              </FlexBoxStyled>
            </TextContainerStyled>
          </FlexBox>
          <div>
            {/* <img className="w-6" src={arrowRight} alt="search" /> */}
          </div>
        </CardStyled>
      )
    })}
  </>
)

export { Category }
