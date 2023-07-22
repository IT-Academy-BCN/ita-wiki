import { FC, ReactElement } from 'react'
import { TopicsManager } from './TopicsManager'
import { UsersManager } from './UsersManager'
import { TabsManager } from '../molecules'

type TTabsData = {
  title: string
  tabComponent: ReactElement
}

const tabsData: TTabsData[] = [
  {
    title: 'Temas',
    tabComponent: <TopicsManager />,
  },
  {
    title: 'Usuarios',
    tabComponent: <UsersManager />,
  },
]

export const SettingsManager: FC = () => <TabsManager tabsData={tabsData} />
