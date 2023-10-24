import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

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
  createdAt: string
  updatedAt: string
  status: 'NOT_SEEN' | 'SEEN'
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
  isFavorite: boolean
}
export type TUser = {
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
  user: {
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
  likes?: number
  title: string
  updatedAt: string
  url: string
  resourceType: string
  topics: TTopicResource[]
  editable: boolean
  isFavorite: boolean
  handleAccessModal: () => void
}
export type TVoteCounter = {
  totalVotes: number
  resourceId: string
  handleAccessModal: () => void
}

export type TVoteCountResponse = {
  downvote: number
  upvote: number
  total: number
  userVote: number
}

export type TVoteMutationData = {
  resourceId: string
  vote: 'up' | 'down' | 'cancel'
}
export type TError = {
  message: string
}
export type TSize = 'small' | 'medium' | 'big'
export type TTooltip = {
  children: React.ReactNode
  size: TSize
  tipLeft?: boolean
  tipRight?: boolean
  tipTop?: boolean
  tipBottom?: boolean
  btnText?: string
}
export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean
  outline?: boolean
  size?: 'small' | 'normal' | 'large'
}
export type TCheckBox = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hiddenLabel?: boolean
  defaultChecked?: boolean
  required?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export type TCounter = {
  number: number
  text: string
  icon: string
}
export type TDropdown = HTMLAttributes<HTMLElement> & {
  selectedValue?: string
  placeholder?: string
}
export type THamburgerMenu = {
  open: boolean
  onClick: () => void
}
export type TIcon = HTMLAttributes<HTMLSpanElement> & {
  name: string
  fill?: number
  wght?: number
  grad?: number
  opsz?: number
  className?: string
  color?: string
  cursor?: string
}
export type TInput = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | string
  success?: boolean
  warning?: boolean
  type?: 'text' | 'password' | 'email'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export type TLabel = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
  text: string
  htmlFor: string
  hiddenLabel?: boolean
}
export type TLink = HTMLAttributes<HTMLAnchorElement> & {
  weight?: 'bold' | 'regular'
  href: string
  children?: React.ReactNode
}
type TRadioOptions = {
  id: string
  name: string
}

export type TRadio = {
  options: TRadioOptions[]
  inputName: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hiddenLabel?: boolean
  defaultChecked?: string
}

export type TSpinner = {
  size?: 'xsmall' | 'small' | 'medium' | 'big'
}
export type TText = HTMLAttributes<HTMLParagraphElement> & {
  fontSize?: string
  fontWeight?: 'normal' | 'bold'
  fontFamily?: string
}
export type TTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows: number
  cols?: number
  error?: boolean | string
  success?: boolean
  warning?: boolean
}
export type TTitle = HTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3'
}
export type TUserImage = HTMLAttributes<HTMLDivElement> & {
  src: string
  alt: string
}
export type TValidationMessage = {
  text?: string
  color?: 'success' | 'error' | 'warning'
}
export type TAccessModal = {
  handleAccessModal: () => void
  handleLoginModal: () => void
  handleRegisterModal: () => void
}
export type TCardHome = {
  cardTitle: string
  cardSubtitle: string
  indicator: string
  icon: string
}
export type TCardProfile = {
  img: string
  userName: string
  email: string
  contributions?: number
  votes?: number
  favorites?: number
  handleLogOut: () => void
}
export type TCreateAuthor = {
  createdBy: string
  updatedAt: string
  img?: string
}
export type TResourceFav = {
  resourceId: string
  isFavorite: boolean
}
export type TInputGroup = {
  id: string
  name: string
  label: string
  validationType?: TValidationMessage['color']
  validationMessage?: TValidationMessage['text']
  icon?: string
  className?: string
  iconClick?: () => void
  hiddenLabel?: boolean
} & TInput

export type TResourceTitleLink = {
  description: string
  title: string
  url: string
}
type TOption = {
  value: string
  label: string
  id?: string
}
export type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: TOption[]
  error?: boolean | string
  placeholder?: string
}
export type TSelectGroup = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  icon?: string
  validationMessage?: TValidationMessage['text']
} & TSelect
