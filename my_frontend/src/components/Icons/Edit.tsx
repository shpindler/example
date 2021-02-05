import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

export interface EditIconProps extends IconProps {}

export const EditIcon: React.FC<EditIconProps & React.ComponentProps<'svg'>> = (
  props,
) => {
  return <AiOutlineEdit {...props} />
}
