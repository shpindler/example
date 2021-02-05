import { IconProps } from '@/components/Icons/index'
import cn from 'classnames'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'

import style from './Spinner.module.scss'

export interface SpinnerIconProps extends IconProps {}

export const SpinnerIcon: React.FC<
  SpinnerIconProps & React.ComponentProps<'svg'>
> = ({ className, ...otherProps }) => {
  return (
    <CgSpinner className={cn(style.SpinnerIcon, className)} {...otherProps} />
  )
}
