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
import { useDeleteMultipleUsers, useDeleteUser } from '../../hooks'

type TDeleteConfirmationModal = {
  open: boolean
  toggleModal: () => void
  idToDelete?: string
  idsToDelete?: string[]
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
  padding-top: ${dimensions.spacing.xs};
  padding-bottom: ${dimensions.spacing.lg};
`

export const ModalSuccessTextStyled = styled(ModalErrorTextStyled)`
  color: ${colors.success};
`

export const DeleteConfirmationModal: FC<TDeleteConfirmationModal> = ({
  open,
  toggleModal,
  idToDelete,
  idsToDelete,
}) => {
  const { t } = useTranslation()
  const { deleteUserMutation, isLoading, isSuccess, isError, reset } =
    useDeleteUser({
      successCb: toggleModal,
    })

  const {
    deleteMultipleUsersMutation,
    isLoading: batchDeleteLoading,
    isSuccess: batchDeleteSuccess,
    isError: batchDeleteError,
    reset: batchDeleteReset,
  } = useDeleteMultipleUsers({
    successCb: toggleModal,
  })

  const handleConfirm = () => {
    if (idToDelete) {
      deleteUserMutation(idToDelete)
    } else if (idsToDelete) {
      deleteMultipleUsersMutation(idsToDelete)
    }
  }

  const handleCancel = () => {
    toggleModal()
    if (idToDelete) {
      reset()
    } else {
      batchDeleteReset()
    }
  }

  return (
    <Modal
      title={t('Eliminar usuario')}
      isOpen={open}
      toggleModal={() => {
        toggleModal()
        if (idToDelete) {
          reset()
        } else {
          batchDeleteReset()
        }
      }}
    >
      {(isSuccess || batchDeleteSuccess) && (
        <ModalSuccessTextStyled data-testid="success-message">
          {t('Usuario eliminado correctamente')}
        </ModalSuccessTextStyled>
      )}
      {(isError || batchDeleteError) && (
        <ModalErrorTextStyled data-testid="error-message">
          {t('Error al eliminar el usuario')}
        </ModalErrorTextStyled>
      )}
      <FlexBox direction="row" gap={dimensions.spacing.md}>
        <Button data-testid="confirm-button" onClick={() => handleConfirm()}>
          {isLoading || batchDeleteLoading ? (
            <Spinner size="xsmall" />
          ) : (
            t('Confirmar')
          )}
        </Button>
        <Button
          data-testid="cancel-button"
          outline
          onClick={() => handleCancel()}
        >
          {t('Cancelar')}
        </Button>
      </FlexBox>
    </Modal>
  )
}
