import { FC, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { dimensions } from '../../styles'
import { Radio, Spinner } from '../atoms'
import { urls } from '../../constants'

const StyledRadio = styled(Radio)`
  flex-direction: column;
  align-items: start;
  gap: ${dimensions.spacing.sm};
`
type TTopicsSlug = {
  slug: string
}

const SmallSpinner = styled(Spinner)`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`

export const TopicsRadioWidget: FC<TTopicsSlug> = ({ slug }) => {
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getTopics', slug],
    queryFn: getTopics,
  })

  const [topic, setTopic] = useState('cli04v2l0000008mq5pwx7w5j')

  const onTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  if (isLoading) return <SmallSpinner role="status" />
  if (isError) return <p>Ha habido un error...</p>

  return (
    <StyledRadio
      options={data?.topics}
      inputName="Topics Radio Filter"
      onChange={onTopicChange}
      defaultChecked={topic}
    />
  )
}
