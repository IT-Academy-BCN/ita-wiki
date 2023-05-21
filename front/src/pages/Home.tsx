import styled from 'styled-components'
import { FC } from 'react'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { CardHome, InputGroup } from '../components/molecules'
import {
  HowToHelpCard,
  CategoriesList,
  ResourcesList,
} from '../components/organisms'
import { Title, Text, Icon } from '../components/atoms'

export type TResource = {
  id: string
  title: string
  createdBy: string
  createdOn: string
  description: string
  img: string
  url: string
  likes: number
}

export const resources: TResource[] = [
  {
    id: 'resourceId1',
    title: 'JavaScript en 45 segundos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Proyecto práctico',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link1',
    likes: 5,
  },
  {
    id: 'resourceId2',
    title: 'REST API de cero a  ninja!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link2',
    likes: 22,
  },
  {
    id: 'resourceId3',
    title: 'Context en 5 minutos!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link3',
    likes: 56,
  },
  {
    id: 'resourceId4',
    title: 'Redux para principiantes!',
    createdBy: 'Ona Costa',
    createdOn: '1995-12-17T03:07:00',
    description: 'Teoria con ejemplos',
    img: icons.profileAvatar,
    url: 'https://www.google.com/search?q=link4',
    likes: 125,
  },
]

// TODO: mobile first!
export const MobileStyled = styled.div`
  display: block;
  @media only ${device.Laptop} {
    display: none;
  }
`
export const DesktopStyled = styled.div`
  display: none;
  @media only ${device.Laptop} {
    display: block;
  }
`
// Style Mobile
const HeaderContainerStyled = styled(FlexBox)`
  padding: ${dimensions.spacing.lg} ${dimensions.spacing.lg} 0
    ${dimensions.spacing.lg};
  align-items: stretch;
  gap: ${dimensions.spacing.base};
`
const GrayBackground = styled.div`
  z-index: -9999;
  position: absolute;
  width: 100%;
  height: 155px;
  background-color: ${colors.gray.gray5};
`

// style Desktop
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
  <>
    <MobileStyled>
      <GrayBackground />
      <HeaderContainerStyled>
        <HowToHelpCard />
        <InputGroup
          label="Buscar"
          placeholder="¿Buscas un tema en concreto?"
          id="search"
          name="search"
          icon="search"
          color={colors.gray.gray3}
        />
      </HeaderContainerStyled>
      <CategoriesList />
      <ResourcesList title="Recursos que te gustan" resources={resources} />
      <ResourcesList title="Tus recursos" resources={resources} />
    </MobileStyled>
    <DesktopStyled>
      <MainContainer>
        <CategoriesList />
        {/* ==> DESKTOP HOME */}
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
  </>
)

export { Home }
