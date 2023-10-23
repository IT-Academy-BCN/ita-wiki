import { FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { TopicsManagerBoard } from './TopicsManagerBoard'
import { UsersManager } from './UsersManager'
import { Tabs } from '../molecules/Tabs'
import { useAuth } from '../../context/AuthProvider'

type TTabsData = {
  id: string
  title: string
  tabComponent: ReactElement
  requiredRole?: string[]
}

const tabsData: TTabsData[] = [
  {
    id: 'topicsTab',
    title: 'Temas',
    tabComponent: <TopicsManagerBoard />,
    requiredRole: ['MENTOR', 'ADMIN']
  },
  {
    id: 'usersTab',
    title: 'Usuarios',
    tabComponent: <UsersManager />,
    requiredRole: ['MENTOR', 'ADMIN']
  },
]

export const SettingsManager: FC = () => {
  const { user } = useAuth()

  const { t } = useTranslation()

  const tTabsData = tabsData
    .filter((tab) => (
      (Array.isArray(tab.requiredRole) && tab.requiredRole.includes(user?.role || '')) ||
      tab.id === 'usersTab'
    ))
    .map((tab) => {
      const modifiedTab = {
        id: tab.id,
        title: t(tab.title),
        tabComponent: tab.tabComponent,
      }

      return modifiedTab
    })

  return <Tabs tabsData={tTabsData} />
}
