import { FC, useId } from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Button,
  Counter,
  Icon,
  Text,
  type TCounter,
  TIcon,
} from '../atoms'
import { FlexBox, colors, font, dimensions, device } from '../../styles'

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
  @media only ${device.Tablet} {
    flex-direction: row;
    gap: ${dimensions.spacing.xl};
  }
`

const UserInfoWrapper = styled(FlexBox)`
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
  profilePicture?: string
  profilePictureAlt: string
  userName: string
  userEmail: string
}

export type TLogoutData = {
  logoutIcon?: TIcon
  handleLogOut: () => void
  logoutMsg: string
}

export type TCardProfile = {
  userData: TUserData
  counterData: TCounter[]
  logoutData: TLogoutData
}

export const CardProfile: FC<TCardProfile> = ({
  userData,
  counterData,
  logoutData,
}) => (
  <ContentContainer
    gap={`${dimensions.spacing.md}`}
    justify="space-between"
    data-testid="card-profile"
  >
    <UserInfoContainer
      direction="column"
      justify="flex-start"
      gap={dimensions.spacing.base}
    >
      <Avatar
        src={userData.profilePicture ?? undefined}
        alt={userData.profilePictureAlt}
      />
      <UserInfoWrapper justify="space-between" gap={dimensions.spacing.xxs}>
        <UsernameStyled as="h1">{userData.userName}</UsernameStyled>
        <TextStyled>{userData.userEmail}</TextStyled>
        <ButtonStyled outline onClick={logoutData.handleLogOut}>
          {logoutData.logoutMsg}{' '}
          {logoutData.logoutIcon?.name ? (
            <Icon name={logoutData.logoutIcon.name} />
          ) : undefined}
        </ButtonStyled>
      </UserInfoWrapper>
    </UserInfoContainer>
    <UserActivityWrapper direction="row" justify="space-between" align="start">
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
