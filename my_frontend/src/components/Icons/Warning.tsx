import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { MdWarning } from 'react-icons/md'

export interface WarningIconProps extends IconProps {}

export const WarningIcon: React.FC<WarningIconProps> = (props) => {
  return <MdWarning {...props} />
}
