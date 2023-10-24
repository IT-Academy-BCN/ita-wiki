import styled from 'styled-components'
import { Button, Text, Title } from '../atoms'
import { FlexBox, colors, dimensions, font } from '../../styles'
import img from '../../assets/icons/lock-dynamic-color.svg'
import { TAccessModal } from '../../types'

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

const AccessModalContent = ({
  handleAccessModal,
  handleLoginModal,
  handleRegisterModal,
}: TAccessModal) => (
  <FlexBox>
    <ImageStyled>
      <img src={img} alt="Lock Dynamic Icon" />
    </ImageStyled>
    <FlexBoxStyled>
      <Title as="h1" fontWeight="bold" color={colors.black.black3}>
        Acceso restringido
      </Title>
      <StyledText>Regístrate para subir o votar contenido</StyledText>
    </FlexBoxStyled>
    <ButtonContainerStyled>
      <ButtonStyled
        onClick={() => {
          handleRegisterModal()
          handleAccessModal()
        }}
      >
        Registrarme
      </ButtonStyled>
      <ButtonStyled
        outline
        onClick={() => {
          handleLoginModal()
          handleAccessModal()
        }}
      >
        Entrar
      </ButtonStyled>
    </ButtonContainerStyled>
  </FlexBox>
)

export { AccessModalContent }
