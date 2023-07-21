import { FC } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { dimensions } from '../../styles'
import { Radio, Spinner } from '../atoms'
import { TGetTopics, getTopics } from '../../helpers/fetchers'

const StyledRadio = styled(Radio)`
  flex-direction: column;
  align-items: start;
  gap: ${dimensions.spacing.xs};
`

type TTopicsSlug = {
  slug: string
  topic: string
  setTopic: (topic: string) => void
}

const SpinnerStyled = styled(Spinner)`
  margin: 0 auto;
`

export const TopicsRadioWidget: FC<TTopicsSlug> = ({
  slug,
  topic,
  setTopic,
}) => {
  const { data, isLoading, isError } = useQuery<TGetTopics>(
    ['getTopics', slug],
    () => getTopics(slug)
  )

  const onTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  if (isLoading) return <SpinnerStyled size="small" role="status" />
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
