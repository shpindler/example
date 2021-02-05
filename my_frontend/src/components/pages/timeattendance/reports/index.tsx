import { useDeviceEventsPermissions } from '@/api/device-events'
import { PageLayoutWithAside } from '@/components/PageLayoutWithAside'
import { ReportsAsideMenu } from '@/components/ReportsAsideMenu'
import { withPagePermissions } from '@/components/withPagePermissions'
import { camelCase, capitalize } from 'lodash'
import React from 'react'

const LatestDeviceEventsList = React.lazy(() =>
  import(
    `@/plugins/user-specific/${window.userKey}/components/Lists/LatestDeviceEvents`
  )
    .then((Module) => {
      return {
        default:
          Module[
            `${capitalize(camelCase(window.userKey))}LatestDeviceEventsList`
          ],
      }
    })
    .catch(() => {
      return import('@/components/Lists/LatestDeviceEvents').then((Module) => {
        return {
          default: Module.LatestDeviceEventsList,
        }
      })
    }),
)

export const ReportsPage = withPagePermissions(function TimeAttendanceHome_() {
  return (
    <PageLayoutWithAside asideMenu={<ReportsAsideMenu />}>
      <LatestDeviceEventsList />
    </PageLayoutWithAside>
  )
}, useDeviceEventsPermissions)
