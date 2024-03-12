import { useState, FC } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  Button,
  FlexBox,
  Modal,
  Text,
  colors,
  device,
  dimensions,
  font,
} from '@itacademy/ui'
import { Login } from './Login'
import { Register } from './Register'

const StyledText = styled(Text)`
  margin: ${dimensions.spacing.sm} ${dimensions.spacing.none}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.none};
  line-height: 1.3rem;
  font-weight: ${font.regular};
`
const ButtonContainerStyled = styled(FlexBox)`
  margin: ${dimensions.spacing.xxs} ${dimensions.spacing.none}
    ${dimensions.spacing.xxl} ${dimensions.spacing.none};
  width: 100%;

  @media only ${device.Tablet} {
    flex-direction: row;
  }
`
const ButtonStyled = styled(Button)`
  height: 62px;
  min-width: 50%;
  margin: ${dimensions.spacing.xxxs} ${dimensions.spacing.xs};
`

export const UserAccessHome: FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { t } = useTranslation()

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <>
      <FlexBox>
        <StyledText color={`${colors.gray.gray3}`} fontSize={`${font.base}`}>
          {t("Registra't")}
        </StyledText>
        <ButtonContainerStyled direction="column">
          <ButtonStyled outline onClick={handleLoginModal}>
            {t('EntrarBtn')}
          </ButtonStyled>
          <ButtonStyled onClick={handleRegisterModal}>
            {t('RegistrarmeBtn')}
          </ButtonStyled>
        </ButtonContainerStyled>
      </FlexBox>
      {/* LOGIN AND REGISTER MODALS (INCLUDE BOTH!! - THEY TOGGLE) */}
      <Modal
        isOpen={isLoginOpen || isRegisterOpen}
        toggleModal={() =>
          isLoginOpen ? setIsLoginOpen(false) : setIsRegisterOpen(false)
        }
      >
        {isLoginOpen && (
          <Login
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
        {isRegisterOpen && (
          <Register
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
          />
        )}
      </Modal>
    </>
  )
}
