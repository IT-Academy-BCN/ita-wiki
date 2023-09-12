import { FC, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, useMutation } from '@tanstack/react-query'
import { colors, FlexBox } from '../../styles'
import { Spinner, Text } from '../atoms'
import { TopicsEditableItem } from '../molecules'
import { urls } from '../../constants'
import { TGetTopics, getTopics } from '../../helpers/fetchers'

const StyledFlexBox = styled(FlexBox)`
  width: 100%;
`

const createTopicFetcher = (createdTopic: TTopic) =>
  fetch(urls.getTopics, {
    method: 'POST',
    body: JSON.stringify(createdTopic),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al crear el tema')
      }
      return res.status === 204 ? {} : res.json()
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error))

const updateTopicFetcher = (updatedTopic: TTopic) =>
  fetch(urls.getTopics, {
    method: 'PATCH',
    body: JSON.stringify(updatedTopic),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al actualizar el tema')
      }
      return res.status === 204 ? null : res.json()
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error))

type TTopic = {
  id?: string
  name: string
  slug?: string
  categoryId?: string
}

export const TopicsManagerBoard: FC = () => {
  const { slug } = useParams()
  const { state } = useLocation()

  const [rowStatus, setRowStatus] = useState<string>('available')

  const [selectedId, setSelectedId] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<string>('')

  const { data, isLoading, isError, refetch } = useQuery<TGetTopics>(
    ['getTopics', slug],
    () => getTopics(slug)
  )

  const updateTopic = useMutation({
    mutationFn: updateTopicFetcher,
    onSuccess: async () => {
      await refetch()
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
  })

  const createTopic = useMutation({
    mutationFn: createTopicFetcher,

    onSuccess: async () => {
      await refetch()
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
  })

  if (slug === undefined) {
    return (
      <Text color={`${colors.error}`}>
        No hay temas disponibles. <br />
        Accede desde una categoría para ver o gestionar sus temas.
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
  if (isError) return <p>Ha habido un error...</p>

  return (
    <>
      {slug ? (
        <StyledFlexBox>
          {data
            .concat([
              {
                id: 'newTopic',
                name: 'Nombre del nuevo tema',
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
      ) : null}
      <br />
      <Text color={`${colors.error}`}>{errorMessage}</Text>
    </>
  )
}
