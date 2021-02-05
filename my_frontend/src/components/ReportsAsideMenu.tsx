import { LayoutPermissionsContext } from '@/components/LayoutPermissions.context'
import {
  SiteNavigationAsideItem,
  SiteNavigationAsideItemProps,
} from '@/components/SiteNavigationAsideItem'
import { withPermissions } from '@/components/withPermissions'
import React from 'react'

export interface DeviceEventsAsideMenuProps {}

const NavigationItemWithPermissions = withPermissions<
  'a',
  SiteNavigationAsideItemProps
>(SiteNavigationAsideItem)

export const ReportsAsideMenu: React.FC<DeviceEventsAsideMenuProps> = () => {
  return (
    <LayoutPermissionsContext.Consumer>
      {(permissions) => (
        <>
          <NavigationItemWithPermissions
            name="Отчеты за сегодняшний день"
            href="/timeattendance/violations/today"
            {...permissions.timetableViolationTodayList}
          />
          <NavigationItemWithPermissions
            name="Отчеты за текущую неделю"
            href="/timeattendance/violations/thisweek"
            {...permissions.timetableViolationThisWeekList}
          />
          <NavigationItemWithPermissions
            name="Отчеты за прошлую неделю"
            href="/timeattendance/violations/prevweek"
            {...permissions.timetableViolationPrevWeekList}
          />
          <NavigationItemWithPermissions
            name="Кто сегодня отмечался"
            href="/timeattendance/whoatwork/"
            {...permissions.whoAtWork}
          />
          <NavigationItemWithPermissions
            name="Кто сегодня не отмечался"
            href="/timeattendance/whoathome/"
            {...permissions.whoAtHome}
          />
          <NavigationItemWithPermissions
            name="Готовые отчеты"
            href="/timeattendance/violations/report/"
            {...permissions.reportList}
          />
          <NavigationItemWithPermissions
            name="Создать отчет"
            href="/timeattendance/violations/report/wizard"
            {...permissions.reportWizard}
          />
          <NavigationItemWithPermissions
            name="Рассылка отчетов"
            href="/timeattendance/violations/periodic-reports/"
            highlighted={true}
            {...permissions.periodicReports}
          />
        </>
      )}
    </LayoutPermissionsContext.Consumer>
  )
}
