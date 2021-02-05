import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { HiOutlineDownload } from 'react-icons/hi'

export interface DownloadIconProps extends IconProps {}

export const DownloadIcon: React.FC<
  DownloadIconProps & React.ComponentProps<'svg'>
> = (props) => {
  return <HiOutlineDownload {...props} />
}
