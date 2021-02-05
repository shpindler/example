import { withPermissionsProps } from '@/components/withPermissions'
import { Parsable } from '@/models/parsable'

export type RawPermissions<K extends string> = Record<K, withPermissionsProps>

export class Permissions
  extends Parsable
  implements Record<string, withPermissionsProps> {
  [x: string]: withPermissionsProps

  static r_x_ = { readable: false, executable: false }
}
