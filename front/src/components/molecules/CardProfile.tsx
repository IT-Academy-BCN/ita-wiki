import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Text, Button, Counter, UserImage } from '../atoms'
import { FlexBox, colors, font, dimensions, device } from '../../styles'
import icons from '../../assets/icons'
import { TINDEX } from '../../locales/translationIndex'

const ContentContainer = styled(FlexBox)`
  width: 90%;
  border-radius: ${dimensions.borderRadius.base};
  padding: ${dimensions.spacing.xs};
  margin: ${dimensions.spacing.xxxl} ${dimensions.spacing.xxs}
    ${dimensions.spacing.none} ${dimensions.spacing.xxs};
  transition: all 0.3s ease;

  @media only ${device.Tablet} {
    width: 96%;
    margin: ${dimensions.spacing.none};
    padding: ${dimensions.spacing.xxl} ${dimensions.spacing.xxl};
    background-color: ${colors.white};
    gap: ${dimensions.spacing.xl};
  }
  @media only ${device.Laptop} {
    width: 90%;
    gap: ${dimensions.spacing.lg};
    padding: ${dimensions.spacing.xxl} ${dimensions.spacing.xxl};
  }

  @media only ${device.Desktop} {
    flex-direction: row;
    padding: ${dimensions.spacing.xxxl} ${dimensions.spacing.xxl};
    width: 86%;
  }
`

const UserInfoContainer = styled(FlexBox)`
  gap: ${dimensions.spacing.base};

  @media only ${device.Tablet} {
    flex-direction: row;
    gap: ${dimensions.spacing.xl};
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
  font-size: ${font.h2};
  color: ${colors.black.black1};
  flex-wrap: wrap;

  @media only ${device.Tablet} {
    font-size: ${font.h1};
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
  border-radius: ${dimensions.borderRadius.base};
  font-size: ${font.xs};
  background-color: transparent;
  width: auto;
  height: 30px;
  padding-inline: ${dimensions.spacing.xxs};
  padding-block: ${dimensions.spacing.none};
  gap: 0.1rem;
  position: absolute;
  top: ${dimensions.spacing.xs};
  right: ${dimensions.spacing.xs};

  @media only ${device.Tablet} {
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

  @media only ${device.Tablet} {
    gap: ${dimensions.spacing.sm};
  }
`

const CenteredCounter = styled(FlexBox)`
  flex: 1;
  @media only ${device.Tablet} {
    width: auto;
  }
`

const SideCounter = styled(FlexBox)`
  flex: 1;
  @media only ${device.Tablet} {
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
  resourcesError: boolean
  favsError: boolean
}
export const CardProfile = ({
  img,
  userName,
  email,
  votes,
  contributions,
  favorites,
  handleLogOut,
  resourcesError,
  favsError,
}: TCardProfile) => {
  const { t } = useTranslation()

  return (
    <ContentContainer
      gap={`${dimensions.spacing.md}`}
      justify="space-between"
      data-testid="card-profile"
    >
      <UserInfoContainer direction="column" justify="flex-start">
        <UserImage
          src={img}
          alt={img === '' ? t(TINDEX.NO_USER_IMAGE) : `${userName}`}
        />
        <UserInfoWrapper>
          <UsernameStyled as="h1">{userName}</UsernameStyled>
          <TextStyled>{email}</TextStyled>
          <ButtonStyled outline onClick={handleLogOut}>
            {t(TINDEX.LOGOUT)} <img src={icons.logout} alt="logout icon" />
          </ButtonStyled>
        </UserInfoWrapper>
      </UserInfoContainer>
      <UserActivityWrapper>
        <SideCounter>
          <Counter
            number={contributions}
            text={t(TINDEX.CONTRIBUTIONS)}
            icon="attach_file"
            isError={resourcesError}
          />
        </SideCounter>
        <CenteredCounter>
          <Counter
            number={votes}
            text={t(TINDEX.VOTES_RECEIVED)}
            icon="expand_less"
            isError={resourcesError}
          />
        </CenteredCounter>
        <SideCounter>
          <Counter
            number={favorites}
            text={t(TINDEX.SAVED_FAV)}
            icon="favorite"
            isError={favsError}
          />
        </SideCounter>
      </UserActivityWrapper>
    </ContentContainer>
  )
}
