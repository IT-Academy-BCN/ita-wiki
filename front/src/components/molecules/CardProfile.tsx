import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { Title, Text, Button, Icon } from '../atoms'
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
  
  @media only ${device.Tablet} {
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

  @media only ${device.Tablet} {
    flex-direction: row;
    margin-top: ${dimensions.spacing.none};
  }
`

const UserInfoContainer = styled(FlexBox)`
  gap: ${dimensions.spacing.base};

  @media only ${device.Tablet} {
    flex-direction: row;
    gap: ${dimensions.spacing.xxl};
  }
`

const UserInfoWrapper = styled(FlexBox)`
  gap: ${dimensions.spacing.xxs};
  justify-content: space-between;

  @media only ${device.Tablet} {
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
  
  @media only ${device.Tablet} {
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
  gap: .1em;
  position: absolute;
  top: ${dimensions.spacing.base};
  right: ${dimensions.spacing.base};

  @media only ${device.Tablet} {
    position: relative;
    margin-top: ${dimensions.spacing.xxs};
    inset: ${dimensions.spacing.none};
  }
`

export const LinkStyled = styled(Text)`
  margin: ${dimensions.spacing.none};
  font-weight: ${font.medium};
  display: flex;
  align-items: center;
  position: absolute;
  top: ${dimensions.spacing.base};
  left: ${dimensions.spacing.base};
  cursor: pointer;
  &:hover {
    opacity: .7;
  }

  @media only ${device.Tablet} {
    display: none;
  }
`

const UserActivityWrapper = styled(FlexBox)`
  flex-direction: row;
  justify-content: center;
  gap: ${dimensions.spacing.xxl};
  margin-top: ${dimensions.spacing.xxl};

  @media only ${device.Tablet} {
    margin-left: ${dimensions.spacing.xxl};
    margin-top: ${dimensions.spacing.none};
  }
`

const ActivityCounterStyled = styled(Text)`
  font-size: 18px;
  font-weight: ${font.bold};
  margin: 0 0 .4em;

  @media only ${device.Tablet} {
    font-size: 30px;
    margin: ${dimensions.spacing.none};
  }
`

const CenteredCounter = styled(FlexBox)`
  text-align: center;
  align-self: center;
  margin-left: auto;
  width: 60%;
`

const SideCounter = styled(FlexBox)`
  width: 20%;
`

type TCardProfile = {
  img: string,
  userName: string,
  email: string,
  contributions?: number,  
  votes?: number,
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
  handleLogOut
}: TCardProfile) => {
  const navigate = useNavigate()
  const handlePrevPage = () => {
  navigate(-1)
  }
  return (
    <MainContainer>
      <ContentContainer gap={ `${dimensions.spacing.lg}` }>

        <TitleStyled as="h1" fontWeight="bold" color={colors.black.black3}>
          Perfil
        </TitleStyled>

        <LinkStyled onClick={ handlePrevPage }>
          <Icon name='arrow_back_ios' wght={700} style={{fontSize: `${font.base}`}}/>
          Volver
        </LinkStyled>

        <InfoContainer>

          <UserInfoContainer>
            <UserImage src={ img } alt={`${userName}'s portrait`} />
            <UserInfoWrapper>
              <UsernameStyled>
                { userName }
              </UsernameStyled>
              <TextStyled>
                { email }
              </TextStyled>
              <ButtonStyled outline onClick={ handleLogOut} >
                  Cerrar sesión 
                  <img src={ icons.logout } alt='logout icon'/> 
              </ButtonStyled>
            </UserInfoWrapper>
          </UserInfoContainer>

          <UserActivityWrapper>

            <SideCounter>
              <ActivityCounterStyled>
                { contributions }
              </ActivityCounterStyled>
              <TextStyled>
                Aportaciones
              </TextStyled>
            </SideCounter>

            <CenteredCounter>
              <ActivityCounterStyled>
                { votes }
              </ActivityCounterStyled>
              <TextStyled>
                Votos
              </TextStyled>
            </CenteredCounter>

            <SideCounter>
              <ActivityCounterStyled>
                { favorites }
              </ActivityCounterStyled>
              <TextStyled>
                Favoritos
              </TextStyled>
            </SideCounter>

          </UserActivityWrapper>

        </InfoContainer>

      </ContentContainer>
    </MainContainer>
  )
} 


export { CardProfile }