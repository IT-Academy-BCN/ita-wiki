import styled from 'styled-components'
import { Title, Text, Button, Counter } from '../atoms'
import { FlexBox, colors, font, dimensions, device } from '../../styles'
import UserImage from '../atoms/UserImage'
import icons from '../../assets/icons'

const MainContainer = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  height: 100vh;
  justify-content: start;
  padding: ${dimensions.spacing.xxl};
`

const ContentContainer = styled(FlexBox)`
  max-width: 1189px;
  width: 100%;
  border-radius: ${dimensions.borderRadius.sm};
  transition: all 0.3s ease;

  @media only ${device.Laptop} {
    padding: ${dimensions.spacing.xxl} 49px;
    background-color: ${colors.white};
    align-items: start;
  }
`

const InfoContainer = styled(FlexBox)`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: ${dimensions.spacing.xxl};

  @media only ${device.Laptop} {
    flex-direction: row;
    margin-top: ${dimensions.spacing.none};
  }
`

const UserInfoContainer = styled(FlexBox)`
  gap: ${dimensions.spacing.base};

  @media only ${device.Laptop} {
    flex-direction: row;
    gap: ${dimensions.spacing.xxl};
  }
`

const UserInfoWrapper = styled(FlexBox)`
  gap: ${dimensions.spacing.xxs};
  justify-content: space-between;

  @media only ${device.Laptop} {
    align-items: start;
  }
`

const UsernameStyled = styled(Text)`
  margin: ${dimensions.spacing.none};
  font-weight: bold;
  font-size: 18px;
  color: ${colors.black.black1};
`

const TitleStyled = styled(Title)`
  margin: ${dimensions.spacing.none};
  display: none;

  @media only ${device.Laptop} {
    font-size: 30px;
    margin: ${dimensions.spacing.none};
    display: block;
  }
`

const TextStyled = styled(Text)`
  font-size: ${font.xs};
  color: ${colors.gray.gray3};
  margin: ${dimensions.spacing.none};
`

const ButtonStyled = styled(Button)`
  color: ${colors.black.black3};
  border: ${`1px solid ${colors.black.black3}`};
  border-radius: ${dimensions.spacing.xxxs};
  font-size: ${font.xs};
  background-color: transparent;
  width: auto;
  height: 30px;
  padding-inline: ${dimensions.spacing.xxs};
  padding-block: ${dimensions.spacing.none};
  gap: 0.1em;
  position: absolute;
  top: ${dimensions.spacing.base};
  right: ${dimensions.spacing.base};

  @media only ${device.Laptop} {
    position: relative;
    margin-top: ${dimensions.spacing.xxs};
    inset: ${dimensions.spacing.none};
  }
`

const UserActivityWrapper = styled(FlexBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: ${dimensions.spacing.xxs};
  margin-top: ${dimensions.spacing.xxl};

  @media only ${device.Laptop} {
    margin-left: ${dimensions.spacing.xxl};
    margin-top: ${dimensions.spacing.none};
  }
`

const CenteredCounter = styled(FlexBox)`
  flex: 1;
  @media only ${device.Laptop} {
    width: auto;
  }
`

const SideCounter = styled(FlexBox)`
  flex: 1;
  @media only ${device.Laptop} {
    width: auto;
  }
`

type TCardProfile = {
  img: string
  userName: string
  email: string
  contributions?: number
  votes?: number
  favorites?: number
  handleLogOut: () => void
}

const CardProfile = ({
  img,
  userName,
  email,
  contributions = 0,
  votes = 0,
  favorites = 0,
  handleLogOut,
}: TCardProfile) => (
  <MainContainer>
    <ContentContainer gap={`${dimensions.spacing.lg}`}>
      <TitleStyled as="h1" fontWeight="bold" color={colors.black.black3}>
        Perfil
      </TitleStyled>

      <InfoContainer>
        <UserInfoContainer>
          <UserImage src={img} alt={`${userName}'s portrait`} />
          <UserInfoWrapper>
            <UsernameStyled>{userName}</UsernameStyled>
            <TextStyled>{email}</TextStyled>
            <ButtonStyled outline onClick={handleLogOut}>
              Cerrar sesión
              <img src={icons.logout} alt="logout icon" />
            </ButtonStyled>
          </UserInfoWrapper>
        </UserInfoContainer>

        <UserActivityWrapper>
          <SideCounter>
            <Counter
              number={contributions}
              text="Aportaciones"
              icon="attach_file"
            />
          </SideCounter>

          <CenteredCounter>
            <Counter number={votes} text="Votos recibidos" icon="expand_less" />
          </CenteredCounter>

          <SideCounter>
            <Counter
              number={favorites}
              text="Favoritos guardados"
              icon="favorite"
            />
          </SideCounter>
        </UserActivityWrapper>
      </InfoContainer>
    </ContentContainer>
  </MainContainer>
)

export { CardProfile }
