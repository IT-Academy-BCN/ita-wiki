import styled from 'styled-components'
import { TResource } from '../../types'
import CardResource from './../organisms/CardResource'
import { useAuth } from '../../context/AuthProvider'

type TResourcesWidget = {
  title: string
  resourcesArray: TResource[]
}

export const UserProfileResourcesWidget = ({
  title,
  resourcesArray,
}: TResourcesWidget) => {
  const { user } = useAuth()
  return (
    <>
      {title} TRadueix-lo
      {resourcesArray.map((resource) => (
        <CardResource
          key={resource.id}
          id={resource.id}
          img=""
          title={resource.title}
          url={resource.url}
          description={resource.description}
          voteCount={resource.voteCount}
          createdBy={resource.user.name}
          createdAt={resource.createdAt}
          updatedAt={resource.updatedAt}
          isFavorite={user ? resource.isFavorite : false}
          editable={user?.name === resource.user.name}
          resourceType={resource.resourceType}
          topics={resource.topics}
        />
      ))}
    </>
  )
}
