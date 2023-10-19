import { FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { TopicsManagerBoard } from './TopicsManagerBoard'
import { UsersManager } from './UsersManager'
import { Tabs } from '../molecules/Tabs'

type TTabsData = {
  title: string
  tabComponent: ReactElement
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
  const { t } = useTranslation()

  const tTabsData = tabsData.map((tab) => ({
    title: t(tab.title),
    tabComponent: tab.tabComponent,
  }))

  return <Tabs tabsData={tTabsData} />
}
