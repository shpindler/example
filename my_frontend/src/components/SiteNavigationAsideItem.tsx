import {
  SiteNavigationItem,
  SiteNavigationItemProps,
} from '@/components/SiteNavigationItem'
import cn from 'classnames'
import React from 'react'

import style from './SiteNavigationAsideItem.module.scss'

export interface SiteNavigationAsideItemProps extends SiteNavigationItemProps {}

export const SiteNavigationAsideItem: React.FC<SiteNavigationAsideItemProps> = ({
  className,
  ...otherProps
}) => {
  return (
    <SiteNavigationItem
      className={cn(style.SiteNavigationAsideItem, className)}
      xs={12}
      {...otherProps}
    />
  )
}
