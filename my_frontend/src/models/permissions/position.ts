import { Permissions, RawPermissions } from '@/models/permissions'

export type RawPositionsPermissionsKeys =
  | 'group_of_positions'
  | 'rate'
  | 'group_name'
  | 'use_in_bid'
  | 'alternate_name'

export type RawPositionsPermissions = RawPermissions<
  RawPositionsPermissionsKeys
>

export class PositionsPermissions extends Permissions {
  groupOfPositions = Permissions.r_x_
  rate = Permissions.r_x_
  groupName = Permissions.r_x_
  useInBid = Permissions.r_x_
  alternateName = Permissions.r_x_

  static mapFields = {
    group_of_positions: 'groupOfPositions',
    rate: 'rate',
    group_name: 'groupName',
    use_in_bid: 'useInBid',
    alternate_name: 'alternateName',
  }

  static parse(rawData: RawPositionsPermissions): PositionsPermissions {
    return super.parse(rawData) as PositionsPermissions
  }

  static unParse(data: PositionsPermissions): RawPositionsPermissions {
    return super.unParse(data) as RawPositionsPermissions
  }
}
