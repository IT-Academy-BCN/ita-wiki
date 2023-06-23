import { useEffect } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, device, dimensions } from '../../styles'
import { Icon, Title } from '../atoms'

export const MobileStyled = styled.div`
  display: block;
  @media only ${device.Tablet} {
    display: none;
  }
`

export const DesktopStyled = styled.div`
  display: none;
  @media only ${device.Tablet} {
    display: block;
  }
`

const ModalMobileContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 4rem;
  overflow: auto;
  z-index: 1;
`

const ModalMobileContent = styled(FlexBox)`
  background-color: ${colors.white};
  width: 95%;
  height: auto;
  margin: ${dimensions.spacing.base} auto;
  padding: ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.sm};

  ${Icon} {
    cursor: pointer;
  }
`
const ModalWrapper = styled(FlexBox)`
  background-color: rgba(0, 0, 0, 0.68); 
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 4rem;
  z-index: -1;
`

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: ${dimensions.spacing.xl};
  overflow: auto;
  z-index: 1;
`

const ModalContent = styled(FlexBox)`
  background-color: ${colors.white};
  width: 50%;
  height: auto;
  margin: ${dimensions.spacing.base} auto;
  padding: ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.sm};

  ${Icon} {
    cursor: pointer;
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
    <>
    <MobileStyled>
      <ModalMobileContainer>
        <ModalWrapper onClick={toggleModal} data-testid="modal-wrapper"/>
        <ModalMobileContent align='stretch'>
          <FlexBox align='end'>
          <Icon 
            name="close"
            onClick={toggleModal}
            role="img"
            aria-label="Close icon"
            wght={700}
          />
          </FlexBox>
          { title && 
            <Title as="h1" fontWeight="bold" color={colors.black.black3}>
              {title}
            </Title>
          }
          {children}
        </ModalMobileContent>
      </ModalMobileContainer>
    </MobileStyled>
    <DesktopStyled>
      <ModalContainer>
        <ModalWrapper onClick={toggleModal} data-testid="modal-wrapper"/>
        <ModalContent align='stretch'>
          <FlexBox align='end'>
          <Icon 
            name="close"
            onClick={toggleModal}
            role="img"
            aria-label="Close icon"
            wght={700}
          />
          </FlexBox>
          { title && 
            <Title as="h1" fontWeight="bold" color={colors.black.black3}>
              {title}
            </Title>
          }
          {children}
        </ModalContent>
      </ModalContainer>
    </DesktopStyled>
    </>
  ) : null
}

export { Modal }
