import { Permissions, RawPermissions } from '@/models/permissions'

export type RawReportsPermissionsKeys =
  | 'timetable_violation_today_list'
  | 'timetable_violation_this_week_list'
  | 'timetable_violation_prev_week_list'
  | 'who_at_work'
  | 'who_at_home'
  | 'report_list'
  | 'report_wizard'
  | 'periodic_reports'

export type RawReportsPermissions = RawPermissions<RawReportsPermissionsKeys>

export class ReportsPermissions extends Permissions {
  timetableViolationTodayList = Permissions.r_x_
  timetableViolationThisWeekList = Permissions.r_x_
  timetableViolationPrevWeekList = Permissions.r_x_
  whoAtWork = Permissions.r_x_
  whoAtHome = Permissions.r_x_
  reportList = Permissions.r_x_
  reportWizard = Permissions.r_x_
  periodicReports = Permissions.r_x_

  static mapFields = {
    timetable_violation_today_list: 'timetableViolationTodayList',
    timetable_violation_this_week_list: 'timetableViolationThisWeekList',
    timetable_violation_prev_week_list: 'timetableViolationPrevWeekList',
    who_at_work: 'whoAtWork',
    who_at_home: 'whoAtHome',
    report_list: 'reportList',
    report_wizard: 'reportWizard',
    periodic_reports: 'periodicReports',
  }

  static parse(rawData: RawReportsPermissions): ReportsPermissions {
    return super.parse(rawData) as ReportsPermissions
  }

  static unParse(data: ReportsPermissions): RawReportsPermissions {
    return super.unParse(data) as RawReportsPermissions
  }
}
