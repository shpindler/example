import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

export interface CheckIconProps
  extends IconProps,
    React.ComponentPropsWithoutRef<'svg'> {}

export const CheckIcon: React.FC<CheckIconProps> = (props) => {
  return <FaCheck {...props} />
}
