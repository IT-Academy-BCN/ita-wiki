import styled from 'styled-components'
import { useState, useEffect } from 'react'
import {
  useQueryClient,
  useMutation,
  QueryCache,
  QueryKey,
} from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Icon, Spinner } from '../atoms'
import { colors } from '../../styles'
import { favMutation } from '../../helpers/fetchers'
import { TResource } from '../organisms'

type TResourceFav = {
  resourceId: string
  isFavorite: boolean
}

const SpinnerStyled = styled(Spinner)`
  margin: 0 auto;
`

export const FavoritesIcon = ({ resourceId, isFavorite }: TResourceFav) => {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  //const [favorite, setFavorite] = useState<boolean>(isFavorite)
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  //@PUC TRURE l'ISE EFFECT I L?STATE FDA FAEOFITRE I DIRECTMWENTE RENDERITAR ISFAVORITE TAL I COM ARRIBA??? + TEST AFEGIR SPINNER

  // useEffect(() => {
  //   setIsLoading(true)
  //   const getFavoriteData = async () => {
  //     setFavorite(isFavorite)
  //     setIsLoading(false)
  //   }
  //   getFavoriteData()
  // }, [isFavorite])

  let queryKeys: QueryKey[]

  const newFav = useMutation({
    mutationFn: favMutation,

    // When mutate is called:
    onMutate: async (fav) => {
      const queryCacheGetResourcesAndGetFavorites = queryClient
        .getQueryCache()
        .findAll(['getResources', 'getFavorites', slug])
      queryKeys = queryCacheGetResourcesAndGetFavorites.map((q) => q.queryKey)
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryKeys)

      // Snapshot the previous value
      const previousFavs: TResource[] | undefined =
        queryClient.getQueryData(queryKeys)

      // Optimistically update to the new value

      for (let i = 0; i < queryKeys.length; i++) {
        const queryKey = queryKeys[i]

        queryClient.setQueryData(
          queryKey,
          (data?: TResource[]) => {
            const newData = data?.map((resource) => {
              if (resource.id === resourceId) {
                return { ...resource, isFavorite: !resource.isFavorite }
              }
              return resource
            })
            return newData
          },
          { updatedAt: Date.now() }
        )
      }
      setIsLoading(false)
      // Return a context object with the snapshotted value
      return { queryKeys, previousFavs }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context) {
        for (let i = 0; i < context.queryKeys.length; i++) {
          const queryKey = context.queryKeys[i]
          queryClient.setQueryData(queryKey, context.previousFavs)
        }
        setIsLoading(false)
      }
      // queryClient.setQueryData(queryKeys, context.previousFavs)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys)
      setIsLoading(false)
    },
  })

  const handleFavorite = (id: string) => {
    setIsLoading(true)
    newFav.mutate(id)
  }

  if (isLoading) return <SpinnerStyled size="xsmall" role="status" />

  return (
    <Icon
      name="favorite"
      onClick={() => handleFavorite(resourceId)}
      fill={isFavorite ? 1 : 0}
      color={`${colors.gray.gray3}`}
      aria-label={
        isFavorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')
      }
      title={isFavorite ? t('Eliminar de favoritos') : t('Añadir a favoritos')}
    />
  )
}
// //OLD:
// onSuccess: () => {
//   const queryCacheGetResources = queryClient
//     .getQueryCache()
//     .findAll(['getResources', 'getFavorites', slug])
//   const queryKeys = queryCacheGetResources.map((q) => q.queryKey)

//   for (let i = 0; i < queryKeys.length; i++) {
//     const queryKey = queryKeys[i]

//     queryClient.setQueryData(
//       queryKey,
//       (data?: TResource[]) => {
//         const newData = data?.map((resource) => {
//           if (resource.id === resourceId) {
//             return { ...resource, isFavorite: !resource.isFavorite }
//           }
//           return resource
//         })
//         return newData
//       },
//       { updatedAt: Date.now() }
//     )
//   }
// },
