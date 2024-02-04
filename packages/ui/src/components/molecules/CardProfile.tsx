import { useId } from 'react'
import styled from 'styled-components'
import { Text, Counter, Button } from '../atoms'
// TODO: FIX when atom UserImage migrated to UI
// import { UserImage } from '../atoms'
import { FlexBox, colors, font, dimensions, device } from '../../styles'
import { TCounter } from '../atoms/Counter'

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

const GenerateId = () => useId()

export type TUserData = {
  profilePicture: string
  noProfilePictureAlt: string
  userName: string
  userEmail: string
}

export type TLogoutData = {
  logoutIcon: string
  altLogout: string
  handleLogOut: () => void
  logoutMsg: string
}

export type TCardProfile = {
  userData: TUserData
  counterData: TCounter[]
  logoutData: TLogoutData
}

export const CardProfile = ({
  userData,
  counterData,
  logoutData,
}: TCardProfile) => (
  <ContentContainer
    gap={`${dimensions.spacing.md}`}
    justify="space-between"
    data-testid="card-profile"
  >
    <UserInfoContainer direction="column" justify="flex-start">
      {/* <UserImage
        src={userData.profilePicture}
        alt={
          userData.profilePicture === ''
            ? userData.noProfilePictureAlt
            : `${userData.userName}`
        }
      /> */}
      <UserInfoWrapper>
        <UsernameStyled as="h1">{userData.userName}</UsernameStyled>
        <TextStyled>{userData.userEmail}</TextStyled>
        <ButtonStyled outline onClick={logoutData.handleLogOut}>
          {logoutData.logoutMsg}{' '}
          <img src={logoutData.logoutIcon} alt={logoutData.altLogout} />
        </ButtonStyled>
      </UserInfoWrapper>
    </UserInfoContainer>
    <UserActivityWrapper>
      {counterData?.map((counter) => (
        <CenteredCounter key={GenerateId()}>
          <Counter
            number={counter.number}
            text={counter.text}
            icon={counter.icon}
            isError={counter.isError}
            errorMessage={counter.errorMessage}
          />
        </CenteredCounter>
      ))}
    </UserActivityWrapper>
  </ContentContainer>
)
