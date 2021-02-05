import { invert } from 'lodash'

export enum RawEmployeeSchedule {
  FIRST_LAST = 1,
  ALL = 2,
  IN_OUT_CHECK = 3,
}

export enum EmployeeSchedule {
  FIRST_LAST,
  ALL,
  IN_OUT_CHECK,
}

export const employeeScheduleParsing = {
  [RawEmployeeSchedule.FIRST_LAST]: EmployeeSchedule.FIRST_LAST,
  [RawEmployeeSchedule.ALL]: EmployeeSchedule.ALL,
  [RawEmployeeSchedule.IN_OUT_CHECK]: EmployeeSchedule.IN_OUT_CHECK,
}

export const employeeScheduleUnParsing = (invert(
  employeeScheduleParsing,
) as unknown) as Record<EmployeeSchedule, RawEmployeeSchedule>
