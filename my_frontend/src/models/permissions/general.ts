import { Permissions, RawPermissions } from '@/models/permissions'

export type RawGeneralPermissionsKeys =
  | 'reports'
  | 'objects'
  | 'offices'
  | 'timetable'
  | 'changes'
  | 'bids'
  | 'pending_requests'
  | 'clients'

export type RawGeneralPermissions = RawPermissions<RawGeneralPermissionsKeys>

export class GeneralPermissions extends Permissions {
  reports = Permissions.r_x_
  objects = Permissions.r_x_
  offices = Permissions.r_x_
  timetable = Permissions.r_x_
  changes = Permissions.r_x_
  bids = Permissions.r_x_
  pending_requests = Permissions.r_x_
  clients = Permissions.r_x_

  static mapFields = {
    pending_requests: 'pendingRequests',
  }

  static parse(rawData: RawGeneralPermissions): GeneralPermissions {
    return super.parse(rawData) as GeneralPermissions
  }

  static unParse(data: GeneralPermissions): RawGeneralPermissions {
    return super.unParse(data) as RawGeneralPermissions
  }
}
