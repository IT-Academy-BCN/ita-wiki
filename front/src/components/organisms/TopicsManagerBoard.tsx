import { FC, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { colors, FlexBox } from '../../styles'
import { Spinner, Text } from '../atoms'
import { TopicsEditableItem } from '../molecules'
import {
  TTopic,
  createTopicFetcher,
  updateTopicFetcher,
} from '../../helpers/fetchers'
import { useAuth } from '../../context/AuthProvider'
import { useGetTopics } from '../../hooks'

const StyledFlexBox = styled(FlexBox)`
  width: 100%;
`

export const TopicsManagerBoard: FC = () => {
  const { user } = useAuth()
  const { slug } = useParams()
  const { state } = useLocation()

  const { t } = useTranslation()

  const [rowStatus, setRowStatus] = useState<string>('available')

  const [selectedId, setSelectedId] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<string>('')

  const { data, isLoading, isError, refetch } = useGetTopics(slug as string)

  const updateTopic = useMutation({
    mutationFn: updateTopicFetcher,
    onSuccess: async () => {
      await refetch()
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  const createTopic = useMutation({
    mutationFn: createTopicFetcher,
    onSuccess: async () => {
      await refetch()
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  if (slug === undefined) {
    return (
      <Text color={`${colors.error}`}>
        {t('No hay temas disponibles.')} <br />
        {t('Accede desde una categoría para ver o gestionar sus temas.')}
      </Text>
    )
  }

  const rowStatusCalculator = (
    rowStatusReceived: string,
    idClicked: string,
    rowTopicId: string
  ): string => {
    if (rowStatusReceived !== 'available') {
      return idClicked === rowTopicId ? rowStatusReceived : 'disabled'
    }
    return rowStatusReceived
  }

  const handleRowStatus = (selectedStatus: string, id: string) => {
    setRowStatus(selectedStatus)
    if (selectedStatus === 'available') return

    setSelectedId(id)
  }

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message)
  }

  const handleTopicChange = (actionTopic: string, changedTopic: TTopic) => {
    // eslint-disable-next-line no-param-reassign
    changedTopic.categoryId = `${state?.id}`

    if (actionTopic === 'update') {
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
                id: 'newTopic',
                name: '',
                categoryId: `${state?.id}`,
                slug: `${state?.slug}`,
              },
            ])
            .map((topic) => (
              <TopicsEditableItem
                key={topic.id}
                id={topic.id}
                name={topic.name}
                rowStatus={rowStatusCalculator(rowStatus, selectedId, topic.id)}
                handleRowStatus={handleRowStatus}
                handleErrorMessage={handleErrorMessage}
                handleTopicChange={handleTopicChange}
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
