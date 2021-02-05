import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { MdFirstPage } from 'react-icons/md'

export interface StopArrowToLeftIconProps extends IconProps {}

export const StopArrowToLeftIcon: React.FC<StopArrowToLeftIconProps> = (
  props,
) => {
  return <MdFirstPage {...props} />
}
