import { BaseModel, RawBaseModel } from '@/models/base'
import {
  EmployeeSchedule,
  RawEmployeeSchedule,
  employeeScheduleParsing,
  employeeScheduleUnParsing,
} from '@/models/employee'
import { Parsable } from '@/models/parsable'
import { DateParser } from '@/models/parser'
import { RawWorkCode, WorkCode } from '@/models/work-code'
import { RawFormErrors } from '@/types/form'
import { invert } from 'lodash'
import { MomentZone, tz } from 'moment-timezone'

export interface ServerDeviceEvent
  extends Omit<RawDeviceEvent, 'office' | 'workcode'> {
  office: string
  workcode: string
}

export enum RawDeviceEventMode {
  DEFAULT = -1,
  HANDMADE = -2,
  PASSWORD = 0,
  FINGER = 1,
  CARD = 2,
  OTHER = 9,
  FACE = 15,
  TELEGRAM = 252,
  PHONE = 253,
  EXTERNAL_SYSTEM = 254,
  UNKNOWN = 255,
}

export enum DeviceEventMode {
  DEFAULT,
  HANDMADE,
  PASSWORD,
  FINGER,
  CARD,
  OTHER,
  FACE,
  TELEGRAM,
  PHONE,
  EXTERNAL_SYSTEM,
  UNKNOWN,
}

export enum RawDeviceEventImageStatus {
  OK = 'ok',
  DUPLICATE = 'duplicate',
  BAD = 'bad',
  EMPTY = 'empty',
  UPLOADING = 'uploading',
  UNKNOWN_ERROR = 'unknown',
  PARTIAL = 'partial',
  NO_PHOTO_FROM_DEVICE = 'not_uploaded_yet',
  MANUAL = 'manual',
}

export enum DeviceEventImageStatus {
  OK,
  DUPLICATE,
  BAD,
  EMPTY,
  UPLOADING,
  UNKNOWN_ERROR,
  PARTIAL,
  NO_PHOTO_FROM_DEVICE,
  MANUAL,
}

export const deviceEventModeParsing = {
  [RawDeviceEventMode.DEFAULT]: DeviceEventMode.DEFAULT,
  [RawDeviceEventMode.HANDMADE]: DeviceEventMode.HANDMADE,
  [RawDeviceEventMode.PASSWORD]: DeviceEventMode.PASSWORD,
  [RawDeviceEventMode.FINGER]: DeviceEventMode.FINGER,
  [RawDeviceEventMode.CARD]: DeviceEventMode.CARD,
  [RawDeviceEventMode.OTHER]: DeviceEventMode.OTHER,
  [RawDeviceEventMode.FACE]: DeviceEventMode.FACE,
  [RawDeviceEventMode.TELEGRAM]: DeviceEventMode.TELEGRAM,
  [RawDeviceEventMode.PHONE]: DeviceEventMode.PHONE,
  [RawDeviceEventMode.EXTERNAL_SYSTEM]: DeviceEventMode.EXTERNAL_SYSTEM,
  [RawDeviceEventMode.UNKNOWN]: DeviceEventMode.UNKNOWN,
}

export const deviceEventModeUnParsing = (invert(
  deviceEventModeParsing,
) as unknown) as Record<DeviceEventMode, RawDeviceEventMode>

export enum RawDeviceEventStatus {
  IN = 51,
  OUT = 52,
  CHECK = 99,
}

export enum DeviceEventStatus {
  IN,
  OUT,
  CHECK,
}

export const deviceEventStatusParsing = {
  [RawDeviceEventStatus.IN]: DeviceEventStatus.IN,
  [RawDeviceEventStatus.OUT]: DeviceEventStatus.OUT,
  [RawDeviceEventStatus.CHECK]: DeviceEventStatus.CHECK,
}

export const deviceEventStatusUnParsing = (invert(
  deviceEventStatusParsing,
) as unknown) as Record<DeviceEventStatus, RawDeviceEventStatus>

export const deviceEventImageStatusParsing = {
  [RawDeviceEventImageStatus.OK]: DeviceEventImageStatus.OK,
  [RawDeviceEventImageStatus.DUPLICATE]: DeviceEventImageStatus.DUPLICATE,
  [RawDeviceEventImageStatus.BAD]: DeviceEventImageStatus.BAD,
  [RawDeviceEventImageStatus.EMPTY]: DeviceEventImageStatus.EMPTY,
  [RawDeviceEventImageStatus.UPLOADING]: DeviceEventImageStatus.UPLOADING,
  [RawDeviceEventImageStatus.UNKNOWN_ERROR]:
    DeviceEventImageStatus.UNKNOWN_ERROR,
  [RawDeviceEventImageStatus.PARTIAL]: DeviceEventImageStatus.PARTIAL,
  [RawDeviceEventImageStatus.NO_PHOTO_FROM_DEVICE]:
    DeviceEventImageStatus.NO_PHOTO_FROM_DEVICE,
  [RawDeviceEventImageStatus.MANUAL]: DeviceEventImageStatus.MANUAL,
}

export const deviceEventImageStatusUnParsing = (invert(
  deviceEventImageStatusParsing,
) as unknown) as Record<DeviceEventImageStatus, RawDeviceEventImageStatus>

export interface RawDeviceEventEmployee extends RawBaseModel {
  id: number
  group: string
  name: string
  personnel_number: string
  position: string
  scheduletype: RawEmployeeSchedule
}

export interface RawDeviceEventDescription extends RawBaseModel {
  username: string
  date: string
  description: string
}

export interface RawDeviceEvent extends RawBaseModel {
  id: number
  employee: RawDeviceEventEmployee
  office: RawDeviceEventOffice
  mode: RawDeviceEventMode
  status: RawDeviceEventStatus
  image: string
  image_status: RawDeviceEventImageStatus
  event_date: string
  creation_date: string
  device_name: string
  workcode: RawWorkCode
  comment: string
  forceskip: boolean
  is_deletable: boolean
  is_editable: boolean
  description: RawDeviceEventDescription
  can_use_image_as_employee_avatar: boolean
  can_invalidate: boolean
}

export class DeviceEventEmployee extends BaseModel {
  group: string
  name: string
  personnelNumber: string
  position: string
  schedule: EmployeeSchedule

  constructor(data: DeviceEventEmployee) {
    super(data)
    this.group = data.group
    this.name = data.name
    this.personnelNumber = data.personnelNumber
    this.position = data.position
    this.schedule = data.schedule
  }

  static mapFields = {
    personnel_number: 'personnelNumber',
    scheduletype: 'schedule',
  }

  static parse(rawData: RawDeviceEventEmployee): DeviceEventEmployee {
    const result = new DeviceEventEmployee(
      super.parse(rawData) as DeviceEventEmployee,
    )
    result.schedule = employeeScheduleParsing[rawData.scheduletype]
    return result
  }

  static unParse(data: DeviceEventEmployee): RawDeviceEventEmployee {
    const result = super.unParse(data) as RawDeviceEventEmployee
    result.scheduletype = employeeScheduleUnParsing[data.schedule]
    return result
  }
}

export interface RawDeviceEventOffice extends RawBaseModel {
  id: number
  name: string
  timezone: string
}

export class DeviceEventOffice extends BaseModel {
  name: string
  timezone: string

  constructor(data: DeviceEventOffice) {
    super(data)
    this.name = data.name
    this.timezone = data.timezone
  }

  static mapFields = {}

  static parse(rawData: RawDeviceEventOffice): DeviceEventOffice {
    return new DeviceEventOffice(super.parse(rawData) as DeviceEventOffice)
  }

  static unParse(data: DeviceEventOffice): RawDeviceEventOffice {
    return super.unParse(data) as RawDeviceEventOffice
  }

  static prepareForServer(data: DeviceEventOffice): string {
    return data.id
  }
}

export class DeviceEventDescription extends Parsable {
  lastEditedBy: string
  lastEdited: Date
  text?: string

  static mapFields = {
    username: 'lastEditedBy',
    date: 'lastEdited',
    description: 'text',
  }

  constructor(data: DeviceEventDescription) {
    super()
    this.lastEdited = data.lastEdited
    this.lastEditedBy = data.lastEditedBy
    this.text = data.text
  }

  static parse(rawData: RawDeviceEventDescription): DeviceEventDescription {
    return new DeviceEventDescription(
      super.parse(rawData) as DeviceEventDescription,
    )
  }

  static unParse(data: DeviceEventDescription): RawDeviceEventDescription {
    return super.unParse(data) as RawDeviceEventDescription
  }
}

export class DeviceEvent extends BaseModel {
  public employee: DeviceEventEmployee
  public office: DeviceEventOffice
  public image: string
  public imageStatus: DeviceEventImageStatus
  public status: DeviceEventStatus
  public mode: DeviceEventMode
  public eventDate: Date
  public creationDate: Date
  public deviceName: string
  public workCode: WorkCode
  public comment: string
  public skip: boolean
  public deletable: boolean
  public editable: boolean
  public description: DeviceEventDescription
  public canUseImageAsEmployeeAvatar: boolean
  public canInvalidate: boolean

  public constructor(data: DeviceEvent) {
    super(data)
    this.employee = data.employee
    this.office = data.office
    this.image = data.image
    this.imageStatus = data.imageStatus
    this.status = data.status
    this.mode = data.mode
    this.eventDate = data.eventDate
    this.creationDate = data.creationDate
    this.deviceName = data.deviceName
    this.workCode = data.workCode
    this.comment = data.comment
    this.skip = data.skip
    this.deletable = data.deletable
    this.editable = data.editable
    this.description = data.description
    this.canUseImageAsEmployeeAvatar = data.canUseImageAsEmployeeAvatar
    this.canInvalidate = data.canInvalidate
  }

  public static mapFields = {
    event_date: 'eventDate',
    creation_date: 'creationDate',
    device_name: 'deviceName',
    workcode: 'workCode',
    forceskip: 'skip',
    is_editable: 'editable',
    is_deletable: 'deletable',
    can_use_image_as_employee_avatar: 'canUseImageAsEmployeeAvatar',
    can_invalidate: 'canInvalidate',
  }

  public static parse(rawData: RawDeviceEvent): DeviceEvent {
    const result = new DeviceEvent(super.parse(rawData) as DeviceEvent)
    result.employee = DeviceEventEmployee.parse(rawData.employee)
    result.office = DeviceEventOffice.parse(rawData.office)
    result.status = deviceEventStatusParsing[rawData.status]
    result.mode = deviceEventModeParsing[rawData.mode]
    result.imageStatus = deviceEventImageStatusParsing[rawData.image_status]
    result.eventDate = new Date(rawData.event_date)
    result.creationDate = new Date(rawData.creation_date)
    result.description = DeviceEventDescription.parse(rawData.description)
    result.workCode = WorkCode.parse(rawData.workcode)
    return result
  }

  public static unParse(data: Partial<DeviceEvent>): Partial<RawDeviceEvent> {
    const result = super.unParse(data) as Partial<RawDeviceEvent>
    const parser = new DateParser()
    if (data.employee !== undefined) {
      result.employee = DeviceEventEmployee.unParse(data.employee)
    }
    if (data.office !== undefined) {
      result.office = DeviceEventOffice.unParse(data.office)
    }
    if (data.status !== undefined) {
      result.status = deviceEventStatusUnParsing[data.status]
    }
    if (data.mode !== undefined) {
      result.mode = deviceEventModeUnParsing[data.mode]
    }
    if (data.imageStatus !== undefined) {
      result.image_status = deviceEventImageStatusUnParsing[data.imageStatus]
    }
    if (data.eventDate !== undefined) {
      result.event_date = parser.unParse(data.eventDate)
    }
    if (data.creationDate !== undefined) {
      result.creation_date = parser.unParse(data.creationDate)
    }
    if (data.description !== undefined) {
      result.description = DeviceEventDescription.unParse(data.description)
    }
    if (data.workCode !== undefined) {
      result.workcode = WorkCode.unParse(data.workCode)
    }
    return result
  }

  public static parseErrors(
    rawData: RawFormErrors<keyof RawDeviceEvent>,
  ): Partial<Record<keyof DeviceEvent, string>> {
    return super.parseErrors(rawData)
  }

  public static prepareForServer(
    data: Partial<DeviceEvent>,
  ): ServerDeviceEvent {
    const result = (this.unParse(data) as unknown) as ServerDeviceEvent
    if (data.office) {
      result.office = DeviceEventOffice.prepareForServer(data.office)
    }
    if (data.workCode) {
      result.workcode = WorkCode.prepareForServer(data.workCode)
    }
    return result
  }

  public get fixed(): boolean {
    return !this.deletable
  }

  public get moscowTimezoneOffset(): number {
    if (!this.office.timezone) {
      return 0
    }
    const zone = tz.zone(this.office.timezone)
    if (!zone) {
      throw new Error('Unknown office timezone.')
    }
    const moscow = tz.zone('Europe/Moscow') as MomentZone
    const utc = Date.UTC(
      this.eventDate.getFullYear(),
      this.eventDate.getMonth(),
      this.eventDate.getDate(),
    )
    return moscow.utcOffset(utc) - zone.utcOffset(utc)
  }
}
