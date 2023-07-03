import icons from '../assets/icons'

type Tcategories = {
  id: number
  category: string
  resources: number
  topics: number
  img: string
}

const categories: Tcategories[] = [
  {
    id: 1,
    img: icons.angular,
    resources: 49,
    category: 'Angular',
    topics: 6,
  },
  {
    id: 2,
    img: icons.react,
    category: 'React',
    resources: 65,
    topics: 7,
  },
  {
    id: 3,
    img: icons.vue,
    category: 'Vue',
    resources: 32,
    topics: 8,
  },
  {
    id: 4,
    img: icons.javascript,
    category: 'Javascript',
    resources: 44,
    topics: 3,
  },
  {
    id: 5,
    img: icons.dataScience,
    category: 'Data Science',
    resources: 23,
    topics: 1,
  },
]

export { categories }
