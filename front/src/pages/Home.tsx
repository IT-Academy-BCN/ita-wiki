import styled from 'styled-components'
import { FC } from 'react'
import icons from '../assets/icons'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { CardHome, UserAccessHome } from '../components/molecules'
import { DesktopSideMenu, Navbar } from '../components/organisms'
import { Title, Text } from '../components/atoms'
import { useAuth } from '../context/AuthProvider'

const Container = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;

  @media only ${device.Tablet} {
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.gray.gray5};
    padding: ${dimensions.spacing.none} ${dimensions.spacing.md}
      ${dimensions.spacing.xl} ${dimensions.spacing.sm};
  }
`

const ContainerMain = styled(FlexBox)`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`

const MainDiv = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  padding: ${dimensions.spacing.md};
  text-align: center;

  @media only ${device.Tablet} {
    justify-content: center;
    padding: ${dimensions.spacing.xs};
    border-radius: ${dimensions.borderRadius.base};
  }
`

const MainContent = styled(FlexBox)`
  @media only ${device.Tablet} {
    justify-content: flex-start;
    padding: ${dimensions.spacing.xs};
    border-radius: ${dimensions.borderRadius.base};
    overflow: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`

const StyledTitle = styled(Title)`
  margin-top: ${dimensions.spacing.xs};
  font-size: 35px;
`

const StyledText = styled(Text)`
  margin: ${dimensions.spacing.sm} ${dimensions.spacing.none}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.none};
  line-height: 1.3rem;
  font-weight: ${font.regular};
`

const ResponsiveFlexBox = styled(FlexBox)`
  align-items: flex-start;
  margin-top: ${dimensions.spacing.md};
  margin-bottom: ${dimensions.spacing.xs};

  @media only ${device.Tablet} {
    flex-direction: row;
    justify-content: space-around;
    gap: 1rem;
  }

  @media only ${device.Desktop} {
    gap: 2rem;
  }
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
    title: `Vota los\nrecursos`,
    subtitle: 'La comunidad decide cuáles son más relevantes',
  },
]

const Home: FC = () => {
  const { user } = useAuth()

  return (
    <Container direction="row" justify="flex-start" align="start">
      <DesktopSideMenu />
      <ContainerMain>
        <Navbar />
        <MainDiv
          as="main"
          justify="flex-start"
          align="center"
          color={`${colors.gray.gray3}`}
        >
          <MainContent>
            <StyledTitle as="h1" fontWeight="bold">
              ¡Bienvenid@ a la wiki de la IT Academy!
            </StyledTitle>
            {!user && <UserAccessHome />}
            <FlexBox>
              <StyledText
                color={`${colors.gray.gray3}`}
                fontSize={`${font.base}`}
              >
                Funcionalidades básicas que te ofrece esta plataforma:
              </StyledText>
              <ResponsiveFlexBox direction="column" gap="1rem">
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
              </ResponsiveFlexBox>
            </FlexBox>
          </MainContent>
        </MainDiv>
      </ContainerMain>
    </Container>
  )
}

export { Home }
