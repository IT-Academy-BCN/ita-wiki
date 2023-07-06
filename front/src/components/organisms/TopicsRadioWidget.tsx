import { FC } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { dimensions } from '../../styles'
import { Radio, Spinner } from '../atoms'
import { urls } from '../../constants'

const StyledRadio = styled(Radio)`
  flex-direction: column;
  align-items: start;
  gap: ${dimensions.spacing.xs};
`

type TTopic = {
  id: string
  name: string
  slug: string
  categoryId: string
}

type TTopicsSlug = {
  slug: string
  topic: string
  setTopic: (topic: string) => void
}

const SmallSpinner = styled(Spinner)`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`

export const TopicsRadioWidget: FC<TTopicsSlug> = ({
  slug,
  topic,
  setTopic,
}) => {
  const getTopics = () =>
    fetch(`${urls.getTopics}?slug=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching topics: ${res.statusText}`)
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(`Error fetching topics: ${err.message}`)
      })

  const { data, isLoading, isError } = useQuery<{ topics: TTopic[] }>({
    queryKey: ['getTopics', slug],
    queryFn: getTopics,
  })

  const onTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  if (isLoading) return <SmallSpinner role="status" />
  if (isError) return <p>Ha habido un error...</p>

  return (
    <StyledRadio
      options={[{ id: 'todos', name: 'Todos' }].concat(
        data?.topics.map((t) => ({ id: t.slug, name: t.name }))
      )}
      inputName="Topics Radio Filter"
      onChange={onTopicChange}
      defaultChecked={topic}
    />
  )
}
