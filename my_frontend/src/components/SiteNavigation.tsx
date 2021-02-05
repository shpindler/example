import { GeneralPermissionsContext } from '@/components/GeneralPermissions.context'
import { CoordinationNavigationItemProps } from '@/components/NavigationItems/Coordination'
import style from '@/components/SiteHeader.module.scss'
import {
  SiteNavigationItem,
  SiteNavigationItemProps,
} from '@/components/SiteNavigationItem'
import { withPermissions } from '@/components/withPermissions'
import cn from 'classnames'
import React from 'react'
import { useLocation } from 'react-router-dom'

export interface SiteNavigationProps {}

const NavigationItemWithPermissions = withPermissions<
  'a',
  SiteNavigationItemProps
>(SiteNavigationItem)
const CoordinationNavigationItemWithPermissions = withPermissions<
  'a',
  CoordinationNavigationItemProps
>(
  React.lazy(() =>
    import('@/components/NavigationItems/Coordination').then((Module) => ({
      default: Module.CoordinationNavigationItem,
    })),
  ),
)

export const SiteNavigation: React.FC<SiteNavigationProps> = () => {
  const { pathname } = useLocation()

  return (
    <GeneralPermissionsContext.Consumer>
      {(permissions) => (
        <>
          <NavigationItemWithPermissions
            className={style.SiteHeader__link}
            {...permissions.reports}
            name="Отчеты"
            to="/timeattendance/reports"
          />
          <SiteNavigationItem
            className={style.SiteHeader__link}
            name="Сотрудники"
            href="/timeattendance/employees/"
          />
          <NavigationItemWithPermissions
            className={style.SiteHeader__link}
            {...permissions.objects}
            name="Объекты"
            href="/timeattendance/object/"
          />
          <NavigationItemWithPermissions
            className={style.SiteHeader__link}
            {...permissions.offices}
            name="Офисы"
            href="/timeattendance/offices/"
          />
          <NavigationItemWithPermissions
            className={style.SiteHeader__link}
            {...permissions.timetable}
            name="Графики"
            href="/timeattendance/timetable/"
          />
          <SiteNavigationItem
            className={cn(style.SiteHeader__link, {
              active: pathname.startsWith('/timeattendance/accounts/profile'),
            })}
            name="Настройки"
            href="/timeattendance/accounts/profile/"
          />
          <NavigationItemWithPermissions
            className={style.SiteHeader__link}
            {...permissions.changes}
            name="Изменения"
            href="/timeattendance/changes/"
            highlighted={true}
          />
          <NavigationItemWithPermissions
            className={style.SiteHeader__link}
            {...permissions.bids}
            name="Заявки"
            href="/timeattendance/bid/"
          />
          <CoordinationNavigationItemWithPermissions
            className={style.SiteHeader__link}
            {...permissions.pendingRequests}
          />
        </>
      )}
    </GeneralPermissionsContext.Consumer>
  )
}
