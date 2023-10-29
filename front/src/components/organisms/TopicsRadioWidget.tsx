import { ChangeEvent, FC, useEffect } from 'react'
import styled from 'styled-components'
import { dimensions } from '../../styles'
import { Radio, Spinner } from '../atoms'
import { useGetTopics } from '../../hooks'
import { useFiltersContext } from '../../context/store/context'
import { ActionTypes } from '../../context/store/types'

const StyledRadio = styled(Radio)`
  flex-direction: column;
  align-items: start;
  gap: ${dimensions.spacing.xs};
`

type TTopicsSlug = {
  slug: string
}

const SpinnerStyled = styled(Spinner)`
  margin: 0 auto;
`

export const TopicsRadioWidget: FC<TTopicsSlug> = ({ slug }) => {
  const { data, isLoading, isError } = useGetTopics(slug)

  const { topics, dispatch } = useFiltersContext()

  const onTopicChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      dispatch({
        type: ActionTypes.SetTopics,
        payload: { topics: [...topics, id] },
      })
    } else {
      dispatch({
        type: ActionTypes.SetTopics,
        payload: {
          topics: topics.filter((el: string) => el !== id),
        },
      })
    }

    return [...topics, id]
  }

  console.log(topics)

  useEffect(() => {
    if (dispatch && data) {
      const categoryId = data.map((id) => id.categoryId)
      dispatch({ type: ActionTypes.SetTopics, payload: { topics: categoryId } })
    }
  }, [dispatch, data])

  if (isLoading) return <SpinnerStyled size="small" role="status" />
  if (isError) return <p>Ha habido un error...</p>

  return (
    <StyledRadio
      options={[{ id: 'todos', name: 'Todos' }].concat(
        data ? data.map((t) => ({ id: t.id, name: t.name })) : []
      )}
      inputName="Topics Radio Filter"
      onChange={(e) => onTopicChange(e, e.target.value)}
      defaultChecked="todos"
    />
  )
}
