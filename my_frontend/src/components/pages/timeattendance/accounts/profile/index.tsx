import { DynamicComponentLoading } from '@/components/DynamicComponentLoading'
import { SettingsLayout } from '@/components/SettingsLayout'
import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'

const ReportSettingsPage = React.lazy(() =>
  import('@/components/pages/timeattendance/accounts/profile/report').then(
    (Module) => ({
      default: Module.GeneralSettingsPage,
    }),
  ),
)
const PositionDictionaryPage = React.lazy(() =>
  import(
    '@/components/pages/timeattendance/accounts/profile/positiondictionary'
  ).then((Module) => ({ default: Module.PositionDictionaryPage })),
)

export const ProfilePage: React.FC = () => {
  const { path } = useRouteMatch()
  return (
    <SettingsLayout>
      <DynamicComponentLoading>
        <Route path={`${path}/report`}>
          <ReportSettingsPage />
        </Route>
        <Route path={`${path}/positiondictionary`}>
          <PositionDictionaryPage />
        </Route>
      </DynamicComponentLoading>
    </SettingsLayout>
  )
}
