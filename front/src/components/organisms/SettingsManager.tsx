import { FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { TopicsManagerBoard } from './TopicsManagerBoard'
import { UsersManager } from './UsersManager'
import { Tabs } from '../molecules/Tabs'
import { useAuth } from '../../context/AuthProvider'

type TTabsData = {
  title: string
  tabComponent: ReactElement | null
}

const tabsData: TTabsData[] = [
  {
    title: 'Temas',
    tabComponent: <TopicsManagerBoard />,
  },
  {
    title: 'Usuarios',
    tabComponent: <UsersManager />,
  },
]

export const SettingsManager: FC = () => {
  const { user } = useAuth()

  const { t } = useTranslation()

  const tTabsData = tabsData
    .filter((tab) => {
      if (tab.title === 'Usuarios') {
        return user?.role === 'MENTOR' || user?.role === 'ADMIN'
      }
      return true
    })
    .map((tab) => {
      const modifiedTab = {
        title: t(tab.title),
        tabComponent: tab.tabComponent,
      }
      
      if (tab.title === 'Usuarios' && user?.role !== 'ADMIN') {
        modifiedTab.tabComponent = null
      }
      
      return modifiedTab
    })

  return <Tabs tabsData={tTabsData} />
}
