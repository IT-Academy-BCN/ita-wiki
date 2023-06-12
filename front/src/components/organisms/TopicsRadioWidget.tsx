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
  const getTopics = async () => {
    try {
      const res = await fetch(`${urls.getTopics}?slug=${slug}`)
      if (!res.ok) throw new Error(`Error fetching topics: ${res.statusText}`)
      const data = await res.json()
      return data
    } catch (err) {
      return err
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['getTopics', slug],
    queryFn: getTopics,
  })

  const [topic, setTopic] = useState('cli04uxud000609k37w9phejw')
  console.log(topic)

  const onTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  if (isLoading) return <SmallSpinner role="status" />
  if (error) return <p>Ha habido un error...</p>

  return (
    <StyledRadio
      options={data?.topics}
      inputName="Topics Radio Filter"
      defaultChecked={data?.topics[0]?.id}
      onChange={onTopicChange}
    />
  )
}
