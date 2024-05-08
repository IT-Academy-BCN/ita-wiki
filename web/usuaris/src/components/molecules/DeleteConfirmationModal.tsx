import {
  Button,
  FlexBox,
  Modal,
  Spinner,
  Text,
  colors,
  dimensions,
} from '@itacademy/ui'
import { FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useDeleteUser } from '../../hooks'

type TDeleteConfirmationModal = {
  open: boolean
  toggleModal: () => void
  idToDelete: string
}

type TButton = HTMLAttributes<HTMLParagraphElement> & {
  backgroundColor?: string
  border?: string
  padding?: string
}

export const ModalButtonStyled = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'padding'].includes(prop),
})<TButton>`
  width: auto;
  margin: ${dimensions.spacing.sm} 0;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
`

export const ModalErrorTextStyled = styled(Text)`
  text-align: center;
  color: ${colors.error};
  margin: ${dimensions.spacing.none};
  padding-top: ${dimensions.spacing.lg};
  padding-bottom: ${dimensions.spacing.lg};
`

export const ModalSuccessTextStyled = styled(ModalErrorTextStyled)`
  color: ${colors.success};
`

export const DeleteConfirmationModal: FC<TDeleteConfirmationModal> = ({
  open,
  toggleModal,
  idToDelete,
}) => {
  const { t } = useTranslation()
  const { deleteUserMutation, isLoading, isSuccess, isError } = useDeleteUser({
    successCb: toggleModal,
  })

  return (
    <Modal
      title={t('Eliminar usuario')}
      isOpen={open}
      toggleModal={toggleModal}
    >
      {isSuccess && (
        <ModalSuccessTextStyled data-testid="success-message">
          {t('Usuario eliminado correctamente')}
        </ModalSuccessTextStyled>
      )}
      {isError && (
        <ModalErrorTextStyled data-testid="error-message">
          {t('Error al eliminar el usuario')}
        </ModalErrorTextStyled>
      )}
      <FlexBox direction="row" gap={dimensions.spacing.md}>
        <Button
          data-testid="confirm-button"
          onClick={() => deleteUserMutation(idToDelete)}
        >
          {isLoading ? <Spinner /> : t('Confirmar')}
        </Button>
        <Button data-testid="cancel-button" outline onClick={toggleModal}>
          {t('Cancelar')}
        </Button>
      </FlexBox>
    </Modal>
  )
}
