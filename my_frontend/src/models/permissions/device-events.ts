import { Permissions, RawPermissions } from '@/models/permissions/index'

export type RawDeviceEventsPermissionsKeys = 'management' | 'status' | 'skip'

export type RawDeviceEventsPermissions = RawPermissions<
  RawDeviceEventsPermissionsKeys
>

export class DeviceEventsPermissions extends Permissions {
  management = Permissions.r_x_
  status = Permissions.r_x_
  skip = Permissions.r_x_

  static mapFields = {}

  static parse(rawData: RawDeviceEventsPermissions): DeviceEventsPermissions {
    return super.parse(rawData) as DeviceEventsPermissions
  }

  static unParse(data: DeviceEventsPermissions): RawDeviceEventsPermissions {
    return super.unParse(data) as RawDeviceEventsPermissions
  }
}
