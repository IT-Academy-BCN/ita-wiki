import { useEffect } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Icon, Title } from '../atoms'

const ModalBackgroundStyled = styled(FlexBox)`
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  overflow: hidden;
  padding: 0.2rem;
  position: fixed;
  z-index: 1000;
`
const ModalWrapper = styled(FlexBox)`
  background-color: rgba(0, 0, 0, 0.68);
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  cursor: default;
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
`

const ModalContainerSyled = styled(FlexBox)`
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  height: 700px;
  margin: 6rem auto ${dimensions.spacing.xl};
  padding: ${dimensions.spacing.xl} ${dimensions.spacing.base};
  position: relative;
  width: 100%;
  max-width: 355px;
  z-index: 1;

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

const Modal = ({ children, isOpen, toggleModal, title }: TModal) => {
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Escape') {
      toggleModal()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return isOpen ? (
    <ModalBackgroundStyled>
      <ModalWrapper onClick={toggleModal} data-testid="modal-wrapper" />
      <ModalContainerSyled justify="flex-start">
        <Icon
          name="close"
          onClick={toggleModal}
          role="img"
          aria-label="Close icon"
          wght={700}
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
}

export { Modal }
