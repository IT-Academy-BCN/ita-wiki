import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TopicsManagerBoard } from './TopicsManagerBoard'
import { UsersManager } from './UsersManager'
import { Tabs } from '../molecules/Tabs'
import { useAuth } from '../../context/AuthProvider'
import { TINDEX } from '../../locales/translationIndex'

const tabsData: React.ComponentProps<typeof Tabs>['tabsData'] = [
  {
    id: 'topicsTab',
    title: `${TINDEX.TOPICS}`,
    tabComponent: <TopicsManagerBoard />,
    requiredRole: ['MENTOR', 'ADMIN'],
  },
  {
    id: 'usersTab',
    title: `${TINDEX.USERS}`,
    tabComponent: <UsersManager />,
    requiredRole: ['ADMIN'],
  },
]

export const SettingsManager: FC = () => {
  const { user } = useAuth()

  const { t } = useTranslation()

  const tTabsData = tabsData
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
        id: tab.id,
        title: t(tab.title),
        tabComponent: tab.tabComponent,
      }

      return modifiedTab
    })

  return <Tabs tabsData={tTabsData} />
}
