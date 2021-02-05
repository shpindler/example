import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { MdNavigateBefore } from 'react-icons/md'

export interface ArrowToLeftIconProps extends IconProps {}

export const ArrowToLeftIcon: React.FC<ArrowToLeftIconProps> = (props) => {
  return <MdNavigateBefore {...props} />
}
