import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export interface DotsIconProps extends IconProps {}

export const DotsIcon: React.FC<DotsIconProps> = (props) => {
  return <BsThreeDotsVertical {...props} />
}
