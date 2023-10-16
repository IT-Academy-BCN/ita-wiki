import { FC, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, useMutation } from '@tanstack/react-query'
import { colors, FlexBox } from '../../styles'
import { Spinner, Text } from '../atoms'
import { TopicsEditableItem } from '../molecules'
import { urls } from '../../constants'
import { TGetTopics, getTopics, TTopic } from '../../helpers/fetchers'
import { useAuth } from '../../context/AuthProvider'
import { useGetTopics } from '../../hooks'

const StyledFlexBox = styled(FlexBox)`
  width: 100%;
`

const errorMessageStatus: { [key: number]: string } = {
  401: 'Operación no autorizada. Es necesario iniciar sesión de usuario.',
  403: 'Acceso denegado. No tienes los permisos necesarios para realizar la operación.',
  404: 'Error al guardar el tema en la base de datos. Por favor, inténtalo de nuevo y si el error persiste, contacta con el administrador.',
  405: 'Identificador de usuario no válido.',
  500: 'Error en la base de datos. Por favor, inténtalo más tarde.',
}

//@SI PASSO AIxÔ A FETCHERS CLA FER ALGUNA MANBERA DE PASSAR ELS ERORRS AQUÏ, PEX FER QUE isEroor retorni núm error i en aquesta pantalla el capto i mostro -- opció B: fer els errors gene´rics i posar-lso a fetchers, retornar el missatge amb isError
const createTopicFetcher = (createdTopic: TTopic) =>
  fetch(urls.postTopics, {
    method: 'POST',
    body: JSON.stringify(createdTopic),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(errorMessageStatus[res.status])
    }
    return res.status === 204 ? {} : res.json()
  })

const updateTopicFetcher = (updatedTopic: TTopic) =>
  fetch(urls.patchTopics, {
    method: 'PATCH',
    body: JSON.stringify(updatedTopic),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(errorMessageStatus[res.status])
    }
    return res.status === 204 ? null : res.json()
  })

// export type TTopic = {
//   id?: string
//   name: string
//   slug?: string
//   categoryId?: string
// }

export const TopicsManagerBoard: FC = () => {
  const { user } = useAuth()
  const { slug } = useParams()
  const { state } = useLocation()

  console.log(state)
  const [rowStatus, setRowStatus] = useState<string>('available')

  const [selectedId, setSelectedId] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<string>('')

  // const { data, isLoading, isError, refetch } = useQuery<TGetTopics>(
  //   ['getTopics', slug],
  //   () => getTopics(slug)
  // )

  const { data, isLoading, isError, refetch } = useGetTopics(slug as string)

  const updateTopic = useMutation({
    mutationFn: updateTopicFetcher,
    onSuccess: async () => {
      await refetch()
      if (errorMessage !== '') setErrorMessage('')
      setRowStatus('available')
    },
    onError: (error: Error) => {
      console.log('Error update:', error.message)
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
      console.log('Error create:', error.message)
      setErrorMessage(error.message)
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
      {/* {/* //OJU, lo bo és === 'MENTOR'
      {user && user.role === 'MENTOR' ? ( *
      //però tb ha de ser admin, o sigui que usear "== 'REGISTERED"
        /} */}

      {user ? (
        // {slug && ( ) //HO HE HAGUT FD'ELIMIANR PER SIMPLIFICAR; I CREC QUE NO CAL PQ JA HEM DEFINIT RUTA SI ÉS UNDEFINED

        <StyledFlexBox>
          <Text fontWeight="bold">Temas de {state.name}</Text>
          {data &&
            data
              .concat([
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
                  rowStatus={rowStatusCalculator(
                    rowStatus,
                    selectedId,
                    topic.id
                  )}
                  handleRowStatus={handleRowStatus}
                  handleErrorMessage={handleErrorMessage}
                  handleTopicChange={handleTopicChange}
                />
              ))
              .reverse()}
        </StyledFlexBox>
      ) : (
        <Text>
          No tienes los permisos necesarios para acceder a este contenido.
        </Text>
      )}
      <br />
      <Text color={`${colors.error}`}>{errorMessage}</Text>
    </>
  )
}
