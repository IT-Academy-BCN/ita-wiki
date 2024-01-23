import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { FlexBox, colors, device, dimensions } from '../../styles'
import { Icon, Title } from '../atoms'
import { TFlexBox } from '../../styles/FlexBox'

const fadeIn = css`
  animation: fadeIn 0.5s forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const fadeOut = css`
  animation: fadeOut 0.5s forwards;
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`
type TModalContentProps = TAnimation & TFlexBox;

const ModalWrapper = styled(FlexBox).withConfig<TModalContentProps>({
  shouldForwardProp: (prop) => !['shouldAnimate'].includes(prop),
})`
  background-color: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 4rem;
  z-index: -1;

  ${({ shouldAnimate }) =>
    shouldAnimate &&
    `
      ${fadeIn};
      `}

  ${({ shouldAnimate }) =>
    !shouldAnimate &&
    `
    ${fadeOut};
    `}
`

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 4rem;
  overflow: auto;
  z-index: 2;

  @media only ${device.Tablet} {
    padding-top: ${dimensions.spacing.xl};
  }
`

const StyledIcon = styled(Icon)`
  cursor: pointer;
  scale: 1.5;
`

type TAnimation = {
  shouldAnimate: boolean
}

const ModalContent = styled(FlexBox).withConfig<TModalContentProps>({
  shouldForwardProp: (prop) => !['shouldAnimate'].includes(prop),
})`
  background-color: ${colors.white};
  width: 95%;
  height: auto;
  margin: ${dimensions.spacing.base} auto;
  padding: ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.sm};

  ${({ shouldAnimate }) =>
    shouldAnimate &&
    `
      ${fadeIn};
      `}

  ${({ shouldAnimate }) =>
    !shouldAnimate &&
    `
    ${fadeOut};
    `}

  @media only ${device.Tablet} {
    width: 50%;
  }
`

type TModal = {
  children: React.ReactNode
  isOpen: boolean
  title?: string
  toggleModal: () => void
}

export const Modal = ({ children, isOpen, toggleModal, title }: TModal) => {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Escape') {
      setTimeout(() => {
        toggleModal()
        setShouldAnimate(true)
      }, 490)
    }
  }

  const handleClick = () => {
    setTimeout(() => {
      toggleModal()
      setShouldAnimate(true)
    }, 490)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return isOpen ? (
    <ModalContainer>
      <ModalWrapper
        onClick={handleClick}
        data-testid="modal-wrapper"
        shouldAnimate={shouldAnimate}
      />
      <ModalContent align="stretch" shouldAnimate={shouldAnimate}>
        <FlexBox align="end">
          <StyledIcon
            name="close"
            onClick={handleClick}
            role="img"
            aria-label="Close icon"
            $wght={700}
          />
        </FlexBox>
        {title && (
          <Title
            as="h1"
            fontWeight="bold"
            color={colors.black.black3}
            style={{ textAlign: 'center' }}
          >
            {title}
          </Title>
        )}
        {children}
      </ModalContent>
    </ModalContainer>
  ) : null
}
