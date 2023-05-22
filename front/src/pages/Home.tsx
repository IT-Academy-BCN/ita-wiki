import styled from 'styled-components'
import { FC } from 'react'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { CardHome } from '../components/molecules'
import { CategoriesList } from '../components/organisms'
import { Title, Text, Icon } from '../components/atoms'

export const DesktopStyled = styled.div`
  display: none;
  @media only ${device.Laptop} {
    display: block;
  }
`

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  direction: row;
  background-color: ${colors.gray.gray5};
  height: 100vh;
  width: 100%;
  padding: ${dimensions.spacing.xl};
`

const DivStyled = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  border-radius: ${dimensions.borderRadius.base};
`

const TextContainerStyled = styled(FlexBox)`
  height: 100%;
  gap: ${dimensions.spacing.xxs};
`

const cardHomeContent = [
  {
    id: 1,
    indicator: '/ 01',
    icon: `${icons.newFolder}`,
    title: 'Guarda tus recursos favoritos',
    subtitle: 'Ten tus recursos bien organizados',
  },
  {
    id: 2,
    indicator: '/ 02',
    icon: `${icons.puzzleDynamic}`,
    title: 'Colabora con tus compañer@s',
    subtitle: 'Recursos compartidos',
  },
  {
    id: 3,
    indicator: '/ 03',
    icon: `${icons.thumbUp}`,
    title: 'Vota los recursos',
    subtitle: 'La comunidad decide cuáles son más relevantes',
  },
]

const Home: FC = () => (
  <DesktopStyled>
    <MainContainer>
      <CategoriesList />
      <DivStyled>
        <TextContainerStyled>
          <Title as="h1">¡Bienvenid@ a la wiki de la IT Academy!</Title>
          <Text color={`${colors.gray.gray3}`} fontSize={`${font.xs}`}>
            Funcionalidades básicas que te ofrece esta plataforma
          </Text>
        </TextContainerStyled>
        <FlexBox direction="row">
          {cardHomeContent.map((content) => (
            <CardHome
              key={content.id}
              cardTitle={content.title}
              cardSubtitle={content.subtitle}
              indicator={content.indicator}
              icon={content.icon}
              data-testid="cardHome"
            />
          ))}
        </FlexBox>
        <TextContainerStyled direction="row">
          <Icon name="info" fill={0} color={`${colors.gray.gray3}`} />
          <Text color={`${colors.gray.gray3}`} fontSize={`${font.xss}`}>
            Para comenzar a visualizar recursos, selecciona una categoría.
            Registro necesario para subir y votar recursos
          </Text>
        </TextContainerStyled>
      </DivStyled>
    </MainContainer>
  </DesktopStyled>
)

export { Home }
