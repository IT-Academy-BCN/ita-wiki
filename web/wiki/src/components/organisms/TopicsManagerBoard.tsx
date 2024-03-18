import { FC, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  colors,
  FlexBox,
  Spinner,
  Text,
  EditableItem,
  TRowStatus,
} from '@itacademy/ui'
import { useAuth } from '../../context/AuthProvider'
import { useGetTopics, useManageTopic } from '../../hooks'
import { TTopic } from '../../types'
import deleteIcon from '../../assets/icons/delete-icon.svg'

const StyledFlexBox = styled(FlexBox)`
  width: 100%;
`

export const TopicsManagerBoard: FC = () => {
  const { user } = useAuth()
  const { slug } = useParams()
  const { state } = useLocation()
  const { t } = useTranslation()
  const [selectedId, setSelectedId] = useState<string>('')
  const { data, isLoading, isError } = useGetTopics(slug as string)

  const {
    updateTopic,
    createTopic,
    errorMessage,
    rowStatus,
    setRowStatus,
    setErrorMessage,
  } = useManageTopic()

  if (slug === undefined) {
    return (
      <Text color={`${colors.error}`}>
        {t('No hay temas disponibles.')} <br />
        {t('Accede desde una categoría para ver o gestionar sus temas.')}
      </Text>
    )
  }

  const rowStatusCalculator = (
    rowStatusReceived: TRowStatus,
    idClicked: string,
    rowTopicId: string
  ): TRowStatus => {
    if (rowStatusReceived !== 'available') {
      return idClicked === rowTopicId ? rowStatusReceived : 'disabled'
    }
    return rowStatusReceived
  }

  const handleRowStatus = (selectedStatus: TRowStatus, id: string) => {
    setRowStatus(selectedStatus)
    if (selectedStatus === 'available') return

    setSelectedId(id)
  }

  const handleErrorMessage = (message: string) => {
    const messageTxt =
      message === 'errorEmptyTxt'
        ? `${t('Por favor, no dejes vacío el nombre del tema.')}`
        : message
    setErrorMessage(messageTxt)
  }

  const handleItemChange = (actionTopic: string, changedTopic: TTopic) => {
    // eslint-disable-next-line no-param-reassign
    changedTopic.categoryId = `${state?.id}`

    if (actionTopic === 'delete') {
      // TODO: Delete topic when DELETE endpoint exists
      handleErrorMessage(t('No es posible borrar el tema.'))
    } else if (actionTopic === 'update') {
      updateTopic.mutate(changedTopic)
    } else {
      createTopic.mutate(changedTopic)
    }
  }

  if (isLoading) return <Spinner size="small" role="status" />
  if (isError) return <p>{t('Ha habido un error...')}</p>

  return (
    <>
      {user ? (
        <StyledFlexBox>
          <Text fontWeight="bold">
            {t('Temas de (category)', { name: state?.name })}
          </Text>
          {data
            ?.concat([
              {
                id: 'newItem',
                name: '',
                categoryId: `${state?.id}`,
                slug: `${state?.slug}`,
              },
            ])
            .map((topic) => (
              <EditableItem
                key={topic.id}
                id={topic.id}
                name={topic.name}
                rowStatus={rowStatusCalculator(rowStatus, selectedId, topic.id)}
                handleRowStatus={handleRowStatus}
                handleErrorMessage={handleErrorMessage}
                handleItemChange={handleItemChange}
                newItemTxt={t('+ Crear nuevo tema')}
                placeholderTxt={t('Nombre del tema')}
                newPlaceholderTxt={t('Nombre del nuevo tema')}
                editTxt={t('Editar')}
                cancelTxt={t('Cancelar')}
                confirmEditTxt={t('Confirmar edición')}
                cancelEditTxt={t('Cancelar edición')}
                deleteTxt={t('Borrar tema')}
                deleteIcon={deleteIcon}
              />
            ))
            .reverse()}
        </StyledFlexBox>
      ) : (
        <Text>{t('No tienes permiso de acceso')}</Text>
      )}
      <br />
      <Text color={`${colors.error}`}>{t(errorMessage)}</Text>
    </>
  )
}
