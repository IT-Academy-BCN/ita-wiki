import { UserRegisterSchema } from '@itacademy/schemas'
import { z } from 'zod'

export type TTopic = {
  id?: string
  name: string
  slug?: string
  categoryId?: string
}

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
    slug: string
    categoryId: string
    createdAt: string
    updatedAt: string
  }
}
export type TGetTypes = string[]
export type TTypesFilterWidget = {
  handleTypesFilter: (selectedTypes: TGetTypes) => void
}
export type TFavorites = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  userId: string
  user?: {
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
  status: string
  voteCount: {
    upvote: number
    downvote: number
    total: number
    userVote: number
  }
  topics: TTopicResource[]
}
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

export type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
  userId?: string
  user?: {
    name: string
    email: string
  }
  voteCount: {
    upvote: number
    downvote: number
    total: number
    userVote: number
  }
  resourceType: string
  topics: TTopicResource[]
  isFavorite: boolean
  editable: boolean
}

export type TFilters = {
  slug?: string
  resourceTypes?: string[]
  status?: string[]
  topic?: string
}
export type TEditResourceProps = {
  description: string
  id: string
  title: string
  url: string
  resourceType: string
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
  description: string
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
  resourceType: string
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
export type TForm = z.infer<typeof UserRegisterSchema>
