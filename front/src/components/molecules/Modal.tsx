import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Icon, Title } from '../atoms'

const ModalBackgroundStyled = styled(FlexBox)`
  background-color: rgba(0, 0, 0, 0.68);
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
`

const ModalContainerSyled = styled(FlexBox)`
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  height: 90%;
  padding: ${dimensions.spacing.xl} 1rem;
  position: relative;
  width: 96%;

  ${Icon} {
    cursor: pointer;
    position: absolute;
    right: ${dimensions.spacing.xxxs};
    top: ${dimensions.spacing.base};
  }
`

type TModal = {
  children: React.ReactNode
  isOpen: boolean
  title?: string
  toggleModal: () => void
}

const Modal = ({ children, isOpen, toggleModal, title }: TModal) =>
  isOpen ? (
    <ModalBackgroundStyled>
      <ModalContainerSyled justify="flex-start">
        <Icon
          name="close"
          onClick={toggleModal}
          role="img"
          aria-label="Close icon"
        />
        <FlexBox>
          <Title as="h1" fontWeight="bold" color={colors.black.black3}>
            {title}
          </Title>
          {children}
        </FlexBox>
      </ModalContainerSyled>
    </ModalBackgroundStyled>
  ) : null

export { Modal }
