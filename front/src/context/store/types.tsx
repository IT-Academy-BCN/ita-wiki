export type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  topics: {
    topic: {
      id: string
      name: string
      slug: string
      categoryId: string
      createdAt: string
      updatedAt: string
    }
  }[]
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
  editable: boolean
}

export type TFilterContext = {
  resources: TResource[]
  types: string[]
  topics: string[]
  status: string[]
  dispatch: React.Dispatch<TAction>
}

export type TAction =
  | { type: 'SET_RESOURCES'; payload: string[] }
  | { type: 'SET_TYPES'; payload: string[] }
  | { type: 'SET_TOPICS'; payload: string[] }
  | { type: 'SET_STATUS'; payload: string[] }
