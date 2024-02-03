import styled from 'styled-components'
import { Button, Text, Title } from '../atoms'
import { FlexBox, colors, dimensions, font } from '../../styles'

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
  title: string
  userMsg: string
  registerBtnTitle: string
  loginBtnTitle: string
  svgSrc: string
  svgAlt: string
}

const AccessModalContent = ({
  handleAccessModal,
  handleLoginModal,
  handleRegisterModal,
  title,
  userMsg,
  registerBtnTitle,
  loginBtnTitle,
  svgSrc,
  svgAlt,
}: TAccessModal) => (
  <FlexBox>
    <ImageStyled>
      <img src={svgSrc} alt={svgAlt} />
    </ImageStyled>
    <FlexBoxStyled>
      <Title as="h1" fontWeight="bold" color={colors.black.black3}>
        {title}
      </Title>
      <StyledText>{userMsg}</StyledText>
    </FlexBoxStyled>
    <ButtonContainerStyled>
      <ButtonStyled
        onClick={() => {
          handleRegisterModal()
          handleAccessModal()
        }}
      >
        {registerBtnTitle}
      </ButtonStyled>
      <ButtonStyled
        outline
        onClick={() => {
          handleLoginModal()
          handleAccessModal()
        }}
      >
        {loginBtnTitle}
      </ButtonStyled>
    </ButtonContainerStyled>
  </FlexBox>
)

export { AccessModalContent }
