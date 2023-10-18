import { FC } from 'react'
import styled from 'styled-components'
import { dimensions } from '../../styles'
import { Radio, Spinner } from '../atoms'
import { useGetTopics } from '../../hooks'

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
  const { data, isLoading, isError } = useGetTopics(slug)

  const onTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  if (isLoading) return <SpinnerStyled size="small" role="status" />
  if (isError) return <p>Ha habido un error...</p>

  return (
    <StyledRadio
      options={[{ id: 'todos', name: 'Todos' }].concat(
        data ? data.map((t) => ({ id: t.id, name: t.name })) : []
      )}
      inputName="Topics Radio Filter"
      onChange={onTopicChange}
      defaultChecked={topic}
    />
  )
}
