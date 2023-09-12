import { FC, ReactElement } from 'react'
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

export const SettingsManager: FC = () => <Tabs tabsData={tabsData} />
