import styled from 'styled-components'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CardHome,
  FlexBox,
  Text,
  Title,
  colors,
  device,
  dimensions,
  font,
} from '@itacademy/ui'
import icons from '../assets/icons'
import {
  DesktopSideMenu,
  Navbar,
  UserAccessHome,
} from '../components/organisms'
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
    title: 'Guarda els teus recursos',
    subtitle: 'Tingues els teus recursos',
  },
  {
    id: 2,
    indicator: '/ 02',
    icon: `${icons.puzzleDynamic}`,
    title: 'Col·labora',
    subtitle: 'Recursos compartits',
  },
  {
    id: 3,
    indicator: '/ 03',
    icon: `${icons.thumbUp}`,
    title: 'Vota els recursos',
    subtitle: 'La comunitat decideix',
  },
]

export const Home: FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <Container direction="row" justify="flex-start" align="start">
      <DesktopSideMenu />
      <ContainerMain justify="flex-start">
        <Navbar />
        <MainDiv
          as="main"
          justify="flex-start"
          align="center"
          color={`${colors.gray.gray3}`}
        >
          <MainContent>
            <StyledTitle as="h1" fontWeight="bold">
              {t('Benvinguts')}
            </StyledTitle>
            {!user && <UserAccessHome />}
            <FlexBox>
              <StyledText
                color={`${colors.gray.gray3}`}
                fontSize={`${font.base}`}
              >
                {t('Funcionalitats')}
              </StyledText>
              <ResponsiveFlexBox direction="column" align="start" gap="1rem">
                {cardHomeContent.map((content) => (
                  <CardHome
                    key={content.id}
                    cardTitle={t(content.title)}
                    cardSubtitle={t(content.subtitle)}
                    indicator={content.indicator}
                    icon={content.icon}
                    data-testid="cardHome"
                    backgroundImg={icons.bgHomeCardCorner}
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
