import { UserRegisterSchema } from '@itacademy/schemas'
import { z } from 'zod'
import type {
  ListFavoritesResourcesResponse,
  ListItinerariesResponse,
  ListResourcesResponse,
  ListResourceTypesResponse,
  ListTopicsResponse,
} from '../openapi/openapiComponents'

export type TItinerary = ListItinerariesResponse[number]

export type TTopic = ListTopicsResponse[number]

export type TGetTopics = {
  id: string
  name: string
  slug: string
  categoryId: string
}[]
export type TTopicResource = {
  topic: {
    id: string
    name: string
    slug?: string
    categoryId: string
    createdAt: string
    updatedAt: string
  }
}
export type TGetTypes = string[]
export type TTypesFilterWidget = {
  handleTypesFilter: (
    selectedTypes: ListResourceTypesResponse | undefined
  ) => void
}

export enum StatusData {
  SEEN = 'SEEN',
  NOT_SEEN = 'NOT_SEEN',
}

export type TStatusData = keyof typeof StatusData

export type TFavorites = ListFavoritesResourcesResponse[number]

export type TUserData = {
  id: string
  email: string
  dni: string
  name: string
  status: string
  role: string
  createdAt: string
  updatedAt: string
}

export type TUserUpdatedStatus = {
  id: string
  status: string
}

export enum ResourceType {
  BLOG = 'BLOG',
  VIDEO = 'VIDEO',
  TUTORIAL = 'TUTORIAL',
}

export type TResourceType = keyof typeof ResourceType

export type TResource = ListResourcesResponse[number]

export type TFilters = {
  categorySlug?: string
  resourceTypes?: TResourceType[]
  status?: string[]
  topic?: string
  search?: string
}
export type TEditResourceProps = {
  description: string
  id: string
  title: string
  url: string
  resourceType: TResourceType
  topics: TTopicResource[]
  isInCardResource?: boolean
}

export type TMappedTopics = {
  id: string
  name: string
}
export type TCategory = {
  id: string
  img?: string
  name: string
  resources?: number
  slug: string
  topics?: number
}

export type TLinkStyled = {
  active?: boolean
}
export type TCardResource = {
  createdBy: string
  createdAt: string
  description?: string | null
  img: string | undefined
  id: string
  voteCount?: {
    upvote: number
    downvote: number
    total: number
    userVote: number
  }
  title: string
  updatedAt: string
  url: string
  resourceType: TResourceType
  topics: TTopicResource[]
  editable: boolean
  isFavorite: boolean
  handleAccessModal: () => void
  fromProfile?: boolean
}

export type TVoteCounter = {
  voteCount: TVoteCount
  resourceId: string
  handleAccessModal: () => void
  fromProfile?: boolean
}

export type TVoteCount = {
  downvote: number
  upvote: number
  total: number
  userVote: number
}

export type TUserVote = 'up' | 'down' | 'cancel'

export type TVoteMutationData = {
  resourceId: string
  vote: TUserVote
}
export type TError = {
  message: string
}

export type TResourceTitleLink = {
  description: string
  title: string
  url: string
  id: string
}
export type TFlexBox = {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'stretch' | 'center' | 'start' | 'end' | 'baseline'
  gap?: string
}

export type TSortOrder = 'asc' | 'desc'

export type TRegisterForm = z.infer<typeof UserRegisterSchema>
