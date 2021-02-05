import { Permissions, RawPermissions } from '@/models/permissions'

export type RawSettingsPermissionsKeys =
  | 'general_parameters'
  | 'periodic_reports_parameters'
  | 'employee_check_settings'
  | 'notifications_parameters'
  | 'additional_users'
  | 'password_recovery_settings'
  | 'audit_list'
  | 'sms_history_list'
  | 'employee_propagation'
  | 'position_dictionary'
  | 'company'
  | 'posts'
  | 'timetable'
  | 'additional_settings'
  | 'employee_documents'
  | 'tariffs'
  | 'rules'
  | 'api_docs'
  | 'plan_attributes'
  | 'manual'

export type RawSettingsPermissions = RawPermissions<RawSettingsPermissionsKeys>

export class SettingsPermissions extends Permissions {
  generalParameters = Permissions.r_x_
  periodicReportsParameters = Permissions.r_x_
  employeeCheckSettings = Permissions.r_x_
  notificationsParameters = Permissions.r_x_
  additionalUsers = Permissions.r_x_
  passwordRecoverySettings = Permissions.r_x_
  auditList = Permissions.r_x_
  smsHistoryList = Permissions.r_x_
  employeePropagation = Permissions.r_x_
  positionDictionary = Permissions.r_x_
  company = Permissions.r_x_
  posts = Permissions.r_x_
  timetable = Permissions.r_x_
  additionalSettings = Permissions.r_x_
  employeeDocuments = Permissions.r_x_
  tariffs = Permissions.r_x_
  rules = Permissions.r_x_
  apiDocs = Permissions.r_x_
  planAttributes = Permissions.r_x_
  manual = Permissions.r_x_

  static mapFields = {
    general_parameters: 'generalParameters',
    periodic_reports_parameters: 'periodicReportsParameters',
    employee_check_settings: 'employeeCheckSettings',
    notifications_parameters: 'notificationsParameters',
    additional_users: 'additionalUsers',
    password_recovery_settings: 'passwordRecoverySettings',
    audit_list: 'auditList',
    sms_history_list: 'smsHistoryList',
    employee_propagation: 'employeePropagation',
    position_dictionary: 'positionDictionary',
    company: 'company',
    posts: 'posts',
    timetable: 'timetable',
    additional_settings: 'additionalSettings',
    employee_documents: 'employeeDocuments',
    tariffs: 'tariffs',
    rules: 'rules',
    api_docs: 'apiDocs',
    plan_attributes: 'planAttributes',
    manual: 'manual',
  }

  static parse(rawData: RawSettingsPermissions): SettingsPermissions {
    return super.parse(rawData) as SettingsPermissions
  }

  static unParse(data: SettingsPermissions): RawSettingsPermissions {
    return super.unParse(data) as RawSettingsPermissions
  }
}
