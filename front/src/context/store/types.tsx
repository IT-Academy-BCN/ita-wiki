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
    userVote: number
  }
  editable: boolean
  isFavorite: boolean
}

export type TInitialState = {
  topics: string | undefined
  status: string[]
  resources: TResource[]
  types: string[]
  dispatch: React.Dispatch<FiltersAction>
}

export enum ActionTypes {
  SetResources = 'SET_RESOURCES',
  SetTypes = 'SET_TYPES',
  SetTopics = 'SET_TOPICS',
  SetStatus = 'SET_STATUS',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export const Actions = {
  [ActionTypes.SetResources]: { resources: {} as TResource[] },
  [ActionTypes.SetTypes]: { types: [] as string[] },
  [ActionTypes.SetTopics]: { topics: '' as string | undefined },
  [ActionTypes.SetStatus]: { status: [] as string[] },
}

export type FiltersAction = ActionMap<typeof Actions>[keyof ActionMap<
  typeof Actions
>]
