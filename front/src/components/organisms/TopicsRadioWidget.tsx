import { FC } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { dimensions } from '../../styles'
import { Radio } from '../atoms'
import { urls } from '../../constants'

const StyledRadio = styled(Radio)`
  flex-direction: column;
  align-items: start;
  gap: ${dimensions.spacing.sm};
`
type TTopicsSlug = {
  slug: string
}

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

  const { data } = useQuery({
    queryKey: ['getTopics', slug],
    queryFn: getTopics,
  })

  return (
    <StyledRadio
      options={data?.topics}
      inputName="Topics Radio Filter"
      defaultChecked="cli04v2l0000008mq5pwx7w5j"
    />
  )
}
