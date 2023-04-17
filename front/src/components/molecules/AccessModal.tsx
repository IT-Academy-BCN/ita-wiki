import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from './Modal'
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
  padding: 5.5rem 0.4rem 0rem;
  width: 100%;
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  width: 100%;
`

const ButtonStyled = styled(Button)`
  font-weight: 500;
  margin: 0rem;
`

type TAccessModal = {
  isOpen: boolean
  toggleModal: () => void
}

const AccessModal = ({ isOpen, toggleModal }: TAccessModal) => (
  <Modal isOpen={isOpen} toggleModal={toggleModal}>
    <ImageStyled>
      <img src={img} alt="Lock Dynamic Icon" />
    </ImageStyled>
    <FlexBoxStyled>
      <Title as="h1" fontWeight="bold" color={colors.black.black3}>
        Acceso restringido
      </Title>
      <Text fontSize={font.xs} fontWeight="bold">
        Regístrate para subir o votar contenido
      </Text>
    </FlexBoxStyled>
    <ButtonContainerStyled>
      <LinkStyled to="/register">
        <ButtonStyled>Registrarme</ButtonStyled>
      </LinkStyled>
      <LinkStyled to="/login">
        <ButtonStyled outline>Entrar</ButtonStyled>
      </LinkStyled>
    </ButtonContainerStyled>
  </Modal>
)

export { AccessModal }
