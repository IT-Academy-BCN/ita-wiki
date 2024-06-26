import { paths } from './paths'

export type TMenu = {
  id: number
  title: string
  icon: string
  path: string
}

export const menu: TMenu[] = [
  {
    id: 1,
    title: 'Usuarios',
    icon: 'person',
    path: paths.home,
  },
  {
    id: 2,
    title: 'Mentores',
    icon: 'person',
    path: paths.mentors,
  },
  {
    id: 3,
    title: 'Connector',
    icon: 'bolt',
    path: '/#',
  },
  {
    id: 4,
    title: 'Configuración',
    icon: 'settings',
    path: '/#',
  },
]
