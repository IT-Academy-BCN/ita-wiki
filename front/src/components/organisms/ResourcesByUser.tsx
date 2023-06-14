import { FC } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../context/AuthProvider'
import { urls } from '../../constants'
import { ResourceTitleLink, TResourceTitleLink } from '../molecules'
import { Spinner } from '../atoms'

type TResourcesByUser = {
  resources: TResourceTitleLink[]
  categorySlug: string
}

const StyledSpinner = styled(Spinner)`
  width: 100px;
  height: 100px;
  align-self: center;
  justify-content: center;
`
const getResourcesByUser = (categorySlug: string | undefined) =>
  fetch(`${urls.getResourcesByUser}?category=${categorySlug}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching resources: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching resources: ${err.message}`)
    })

const ResourcesByUser: FC<TResourcesByUser> = () => {
  const { user } = useAuth()
  const params = useParams()

  const categorySlug: string | undefined = params.slug

  console.log('slug', categorySlug)
  console.log('user', user)

  const { isLoading, data, error } = useQuery({
    queryKey: ['getResourcesByUser', categorySlug],
    queryFn: () => getResourcesByUser(categorySlug),
  })

  if (error) return <p>Ha habido un error...</p>

  console.log('data', data)

  return (
    
  )
}

export default ResourcesByUser
