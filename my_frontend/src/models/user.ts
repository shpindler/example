import { BaseModel, RawBaseModel } from '@/models/base'
import { FormErrors, RawFormErrors } from '@/types/form'
import { tz } from 'moment-timezone'

export interface RawUserProfile extends RawBaseModel {
  timezone: string
}

export interface RawUser extends RawBaseModel {
  username: string
  userprofile: RawUserProfile
  is_support: boolean
}

export class UserProfile extends BaseModel {
  timezone: string

  constructor(data: UserProfile) {
    super(data)
    this.timezone = data.timezone
  }

  static mapFields = {}

  static parse(rawData: RawUserProfile): UserProfile {
    return new UserProfile(super.parse(rawData) as UserProfile)
  }

  static unParse(data: UserProfile): RawUser {
    return super.unParse(data) as RawUser
  }
}

export class User extends BaseModel {
  username: string
  profile: UserProfile
  isSupport: boolean

  constructor(data: User) {
    super(data)
    this.username = data.username
    this.profile = data.profile
    this.isSupport = data.isSupport
  }

  static mapFields = {
    is_support: 'isSupport',
  }

  static parse(rawData: RawUser): User {
    const result = new User(super.parse(rawData) as User)
    result.profile = UserProfile.parse(rawData.userprofile)
    return result
  }

  static unParse(data: User): RawUser {
    return super.unParse(data) as RawUser
  }

  static parseErrors(rawData: RawFormErrors<keyof RawUser>): FormErrors<User> {
    return super.parseErrors(rawData)
  }

  get timezoneOffset(): number {
    if (!this.profile.timezone) {
      return 0
    }
    const zone = tz.zone(this.profile.timezone)
    if (!zone) {
      throw new Error('Unknown user timezone.')
    }
    const now = new Date()
    return zone.utcOffset(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
    )
  }
}
