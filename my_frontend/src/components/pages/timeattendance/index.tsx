import { useReportsPermissions } from '@/api/reports'
import { DynamicComponentLoading } from '@/components/DynamicComponentLoading'
import { PageLayout } from '@/components/PageLayout'
import { withLayoutPermissions } from '@/components/withLayoutPermissions'
import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'

const ProfilePage = React.lazy(() =>
  import(
    '@/components/pages/timeattendance/accounts/profile'
  ).then((Module) => ({ default: Module.ProfilePage })),
)

const ReportsPage = React.lazy(() =>
  import('@/components/pages/timeattendance/reports').then((Module) => ({
    default: Module.ReportsPage,
  })),
)

export const IndexPage: React.FC = withLayoutPermissions(
  function TimeAttendanceHome_() {
    const { path } = useRouteMatch()
    return (
      <PageLayout>
        <DynamicComponentLoading>
          <Route path={`${path}/accounts/profile`}>
            <ProfilePage />
          </Route>
          <Route path={`${path}/reports`}>
            <ReportsPage />
          </Route>
        </DynamicComponentLoading>
      </PageLayout>
    )
  },
  useReportsPermissions,
)
