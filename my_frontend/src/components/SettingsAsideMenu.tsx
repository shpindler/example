import { LayoutPermissionsContext } from '@/components/LayoutPermissions.context'
import {
  SiteNavigationAsideItem,
  SiteNavigationAsideItemProps,
} from '@/components/SiteNavigationAsideItem'
import { withPermissions } from '@/components/withPermissions'
import { camelCase, capitalize } from 'lodash'
import React from 'react'

const AuditNavigationItem = React.lazy(() =>
  import(
    `@/plugins/user-specific/${window.userKey}/components/NavigationItems/Audit`
  )
    .then((Module) => {
      return {
        default:
          Module[`${capitalize(camelCase(window.userKey))}AuditNavigationItem`],
      }
    })
    .catch(() =>
      import('@/components/NavigationItems/Audit').then((Module) => ({
        default: Module.AuditNavigationItem,
      })),
    ),
)

export interface SettingsAsideMenuProps {}

const NavigationItemWithPermissions = withPermissions<
  'a',
  SiteNavigationAsideItemProps
>(SiteNavigationAsideItem)
const AuditNavigationItemWithPermissions = withPermissions(AuditNavigationItem)

export const SettingsAsideMenu: React.FC<SettingsAsideMenuProps> = () => {
  return (
    <LayoutPermissionsContext.Consumer>
      {(permissions) => (
        <>
          <SiteNavigationAsideItem
            name="Краткая информация"
            href="/timeattendance/accounts/profile/"
          />
          <NavigationItemWithPermissions
            {...permissions.generalParameters}
            name="Основные параметры"
            to="/timeattendance/accounts/profile/report"
          />
          <NavigationItemWithPermissions
            {...permissions.periodicReportsParameters}
            name="Параметры рассылки отчетов"
            href="/timeattendance/accounts/profile/periodic/"
          />
          <NavigationItemWithPermissions
            {...permissions.employeeCheckSettings}
            name="Параметры проверки сотрудников"
            href="/timeattendance/accounts/profile/checks/"
            highlighted={true}
          />
          <NavigationItemWithPermissions
            {...permissions.notificationsParameters}
            name="Параметры уведомлений"
            href="/timeattendance/accounts/profile/sms/"
          />
          <NavigationItemWithPermissions
            {...permissions.additionalUsers}
            name="Дополнительные пользователи"
            href="/timeattendance/accounts/profile/users/"
          />
          <NavigationItemWithPermissions
            {...permissions.passwordRecoverySettings}
            name="Параметры восстановления пароля"
            href="/timeattendance/accounts/profile/password-recovery-settings/"
          />
          <AuditNavigationItemWithPermissions {...permissions.auditList} />
          <NavigationItemWithPermissions
            {...permissions.smsHistoryList}
            name="Отправленные SMS-сообщения"
            href="/timeattendance/accounts/profile/sms/history/"
          />
          <NavigationItemWithPermissions
            {...permissions.employeePropagation}
            name="Где сотрудники могут отмечаться"
            href="/timeattendance/accounts/profile/employeepropagation/"
          />
          <SiteNavigationAsideItem
            name="Сменить пароль"
            href="/timeattendance/accounts/profile/password_change/"
          />
          <NavigationItemWithPermissions
            {...permissions.positionDictionary}
            name="Настройка справочника должностей"
            to="/timeattendance/accounts/profile/positiondictionary"
          />
          <NavigationItemWithPermissions
            {...permissions.company}
            name="Справочник клиентов"
            href="/timeattendance/company/"
          />
          <NavigationItemWithPermissions
            {...permissions.posts}
            name="Справочник постов"
            href="/timeattendance/accounts/profile/posts/"
          />
          <NavigationItemWithPermissions
            {...permissions.timetable}
            name="Шаблоны графиков"
            href="/timeattendance/timetable/"
          />
          <NavigationItemWithPermissions
            {...permissions.additionalSettings}
            name="Параметры доп. функционала"
            href="/timeattendance/accounts/profile/additionalsettings/"
          />
          <NavigationItemWithPermissions
            {...permissions.employeeDocuments}
            name="Загрузка документов сотрудников"
            href="/timeattendance/positiondocuments/import/"
          />
          <NavigationItemWithPermissions
            {...permissions.tariffs}
            name="Тарифы"
            href="/timeattendance/accounts/profile/tarifs/"
          />
          <NavigationItemWithPermissions
            {...permissions.rules}
            name="Правила учета рабочего времени"
            href="/timeattendance/accounts/profile/timeattendance-rules/"
          />
          <NavigationItemWithPermissions
            {...permissions.apiDocs}
            name="Описание API"
            href="/timeattendance/accounts/profile/api-docs/tc/"
          />
          <NavigationItemWithPermissions
            {...permissions.planAttributes}
            name="Атрибуты планирования"
            href="/timeattendance/accounts/profile/planattributes/"
          />
          <NavigationItemWithPermissions
            {...permissions.manual}
            name="Инструкция"
            href="/timeattendance/accounts/profile/timeattendance-manual/"
          />
        </>
      )}
    </LayoutPermissionsContext.Consumer>
  )
}
