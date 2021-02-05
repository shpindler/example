import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { AiOutlineIdcard } from 'react-icons/ai'

export interface IdCardIconProps extends IconProps {}

export const IdCardIcon: React.FC<IdCardIconProps> = (props) => {
  return <AiOutlineIdcard {...props} />
}
