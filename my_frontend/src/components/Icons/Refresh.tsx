import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { MdRefresh } from 'react-icons/md'

export interface RefreshIconProps extends IconProps {}

export const RefreshIcon: React.FC<
  RefreshIconProps & React.ComponentProps<'svg'>
> = (props) => {
  return <MdRefresh {...props} />
}
