import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { BiCalendar } from 'react-icons/bi'

export interface CalendarIconProps
  extends IconProps,
    React.ComponentProps<'svg'> {}

export const CalendarIcon: React.FC<CalendarIconProps> = (props) => {
  return <BiCalendar {...props} />
}
