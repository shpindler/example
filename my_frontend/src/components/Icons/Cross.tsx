import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { ImCross } from 'react-icons/im'

export interface CrossIconProps
  extends IconProps,
    React.ComponentPropsWithoutRef<'svg'> {}

export const CrossIcon: React.FC<CrossIconProps> = (props) => {
  return <ImCross {...props} />
}
