import { FC } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { dimensions, Spinner, Radio } from '@itacademy/ui'
import { useListTopics } from '../../openapi/openapiComponents'

const StyledRadio = styled(Radio)`
  align-items: start;
  gap: ${dimensions.spacing.xs};
`

type TTopicsSlug = {
  slug: string
  setTopic: (value: string) => void
}

const SpinnerStyled = styled(Spinner)`
  margin: 0 auto;
`

export const TopicsRadioWidget: FC<TTopicsSlug> = ({ slug, setTopic }) => {
  const { data, isLoading, isError } = useListTopics({
    queryParams: { slug },
  })

  const { t } = useTranslation()

  const onTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  if (isLoading) return <SpinnerStyled size="small" role="status" />
  if (isError) return <p>Ha habido un error...</p>

  const options = [
    { id: 'todos', name: t('Todos') },
    ...(data ? data.map((tp) => ({ id: tp.id, name: tp.name })) : []),
  ]

  return (
    <StyledRadio
      options={options}
      inputName="Topics Radio Filter"
      direction="column"
      onChange={onTopicChange}
      defaultChecked="todos"
    />
  )
}
