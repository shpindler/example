import { DeviceEvent, RawDeviceEvent } from '@/models/device-event'

export interface FfrgRawDeviceEvent extends RawDeviceEvent {
  territorial_manager_email: string
}

export class FfrgDeviceEvent extends DeviceEvent {
  territorialManagerEmail: string

  public constructor(data: FfrgDeviceEvent) {
    super(data)
    this.territorialManagerEmail = data.territorialManagerEmail
  }

  public static mapFields = {
    ...DeviceEvent.mapFields,
    territorial_manager_email: 'territorialManagerEmail',
  }

  public static parse(rawData: FfrgRawDeviceEvent): FfrgDeviceEvent {
    const result = super.parse(rawData) as FfrgDeviceEvent
    result.territorialManagerEmail = rawData.territorial_manager_email
    return result
  }
}
