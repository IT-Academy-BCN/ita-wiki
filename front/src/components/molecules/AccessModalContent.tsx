import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Button, Text, Title } from '../atoms'
import { FlexBox, colors, dimensions, font } from '../../styles'
import img from '../../assets/icons/lock-dynamic-color.svg'

const ImageStyled = styled.div`
  margin-top: 3.5rem;
`

const FlexBoxStyled = styled(FlexBox)`
  height: 100%;
  padding: ${dimensions.spacing.base} ${dimensions.spacing.xl};
  text-align: center;
`

const ButtonContainerStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
  padding: 3.5rem 0.4rem 5.5rem 0.4rem;
  width: 100%;
`

const ButtonStyled = styled(Button)`
  font-weight: 500;
  margin: 0rem;
`

const StyledText = styled(Text)`
  font-weight: ${font.medium};
`
type TAccessModal = {
  handleAccessModal: () => void
  handleLoginModal: () => void
  handleRegisterModal: () => void
}

const AccessModalContent = ({
  handleAccessModal,
  handleLoginModal,
  handleRegisterModal,
}: TAccessModal) => {
  const { t } = useTranslation()

  return (
    <FlexBox>
      <ImageStyled>
        <img src={img} alt="Lock Dynamic Icon" />
      </ImageStyled>
      <FlexBoxStyled>
        <Title as="h1" fontWeight="bold" color={colors.black.black3}>
          {t('Acceso restringido')}
        </Title>
        <StyledText>{t('Regístrate para subir o votar contenido')}</StyledText>
      </FlexBoxStyled>
      <ButtonContainerStyled>
        <ButtonStyled
          onClick={() => {
            handleRegisterModal()
            handleAccessModal()
          }}
        >
          {t('Registrarme')}
        </ButtonStyled>
        <ButtonStyled
          outline
          onClick={() => {
            handleLoginModal();
            handleAccessModal();
          }}
        >
          {t('Entrar')}
        </ButtonStyled>
      </ButtonContainerStyled>
    </FlexBox>
  )
}

export { AccessModalContent }
