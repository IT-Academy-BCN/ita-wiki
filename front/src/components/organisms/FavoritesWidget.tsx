import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import styled from 'styled-components'
import { Icon } from '../atoms'
import { colors } from '../../styles'
import { useAuth } from '../../context/AuthProvider'

import { urls } from '../../constants'

//Atenció: aquesta és la consulta que caldria fer des de MyFavoritesList.tsx, jo no necessitaria concretar slug, però així redueix els ítems de l'array, i així es pot unificar pels dos: passar-ho a fetchers pq el hook que es f servir a Profile no ens serviria, crec. A més, caldrà fer refetc dels dos (card i list), ai´xí que més raó per compartir-lo, tot i que no sé si puc fer refetch en altre arxiu. EL canvi de color del cor ha de ser OPTIMISTIC mutation -- RARO del copón que no em surti candau a Swagger per a api/v1/resources/favorites
const getFavorites = async () =>
  fetch(urls.getFavorites)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching favorite resources: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching favorite resources: ${err.message}`)
    })

// //AMB SLUG
// const getFavorites = async (slug?: string) =>
//   fetch(`${urls.getFavorites}?categorySlug=${slug}`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(
//           `Error fetching favorite resources: ${res.statusText}`
//         )
//       }
//       return res.json()
//     })
//     .catch((err) => {
//       throw new Error(`Error fetching favorite resources: ${err.message}`)
//     })

type TFavorites = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  userId: string
  createdAt: string
  updatedAt: string
}

type TGetFavorites = TFavorites[]

type TResourceSimplified = {
  resourceId: string
}

export const FavoritesWidget = ({ resourceId }: TResourceSimplified) => {
  const { user } = useAuth()
  const { slug } = useParams()

  const useCalculateFav = (): boolean => {
    const { data } = useQuery<TGetFavorites>({
      queryKey: ['getFavorites'],
      queryFn: () => getFavorites(),
      enabled: !!user, // Enable the query only if there is a logged-in user
    })

    if (data) return data?.some((resource) => resource.id === resourceId)
    return false
  }

  //GetFAVORITES AMB SLUG const useCalculateFav = (): boolean => {
  //   const { data } = useQuery<TGetFavorites>({
  //     queryKey: ['getFavorites', slug],
  //     queryFn: () => getFavorites(slug),
  //     enabled: !!user, // Enable the query only if there is a logged-in user
  //   })

  //   if (data) return data?.some((resource) => resource.id === resourceId)
  //   return false
  // }

  const [favorite, setFavorite] = useState<boolean>(useCalculateFav() || false)

  console.log('resourceId', resourceId)

  const favMutation = async (id: string) => {
    const response = await fetch(urls.favorites, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (!response.ok) {
      throw new Error(
        `Error updating favorite resource: ${response.statusText}`
      )
    }
    if (response.ok) {
      console.log('Done')
      setFavorite(!favorite)
    }
  }

  //Si està loguejat : if user > Connectar a getFavorites, obtens llistat de favorits per usuari, i allí filtres si array conté id del recurs (li he de passar com aprop de CardResource) ia mb això pinta sí o no. I uqna toca, fa un POST i refetch... >> REFETCH només pera MyFavoritesList // user ho valida abans de decidir si pint o no cor?? Aleshores aquí no cal validar-ho

  const newFav = useMutation({
    mutationFn: favMutation,
    // onSuccess: () => {
    //   console.log('yeah')
    // },
    // onError: () => {
    //   // eslint-disable-next-line no-console
    //   console.error('Error fav')
    // },
  })

  const handleFavorite = (id: string) => {
    newFav.mutate(id)
  }

  // >Z>>>>>>UNCOMMENT THIS SI NO HO FICO AL USE STATE
  // const calculateFavorite = () => {
  //   //I si posem que cridi això quan ha acaba el GET?
  //   console.log('array', data)

  //   const calculate = data?.some((resource) => resource.id === resourceId)

  //   if (calculate) setFavorite(calculate)
  //   console.log(calculate)
  // }

  return (
    <Icon
      name="favorite"
      onClick={() => handleFavorite(resourceId)}
      fill={favorite ? 1 : 0}
      color={`${colors.gray.gray3}`}
      title={favorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
    />
  )
}
