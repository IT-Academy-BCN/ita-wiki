import { ReactElement, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TopicsManagerBoard } from './TopicsManagerBoard'
import { UsersManager } from './UsersManager'
//import { Tabs } from '../../../../packages/ui/src/components/molecules'
import { Tabs } from '@itacademy/ui'
import { useAuth } from '../../context/AuthProvider'

type TTabsDataInfo = {
  id: string
  title: string
  tabComponent: ReactElement
  requiredRole?: string[]
}

const tabsDataInfo: TTabsDataInfo[] = [
  {
    id: 'topicsTab',
    title: 'Temas',
    tabComponent: <TopicsManagerBoard />,
    requiredRole: ['MENTOR', 'ADMIN'],
  },
  {
    id: 'usersTab',
    title: 'Usuarios',
    tabComponent: <UsersManager />,
    requiredRole: ['ADMIN'],
  },
]

export const SettingsManager = () => {
  const { user } = useAuth()

  const { t } = useTranslation()

  const tabsData = tabsDataInfo
    .filter((tab) => {
      if (tab.id === 'usersTab') {
        return user?.role === 'ADMIN'
      }
      return (
        Array.isArray(tab.requiredRole) &&
        tab.requiredRole.some((role) => role === user?.role)
      )
    })
    .map((tab) => {
      const modifiedTab = {
        title: t(tab.title),
        tabComponent: tab.tabComponent,
      }

      return modifiedTab
    })

  return (
    <>
      <Tabs tabsData={tabsData} />
    </>
  )
}
