import { usePendingCount } from '@/api/settings'
import {
  SiteNavigationItem,
  SiteNavigationItemProps,
} from '@/components/SiteNavigationItem'
import style from '@/components/SiteNavigationItem.module.scss'
import React from 'react'

export interface CoordinationNavigationItemProps
  extends Partial<SiteNavigationItemProps> {}

export const CoordinationNavigationItem: React.FC<CoordinationNavigationItemProps> = ({
  name = 'Согласования',
  href = '/timeattendance/corrections/ongoing/',
  ...otherProps
}) => {
  const { data: count = 0 } = usePendingCount()

  return (
    <SiteNavigationItem href={href} {...otherProps}>
      {name}
      {count > 0 && (
        <div className={style.SiteNavigationItem__counter}>{count}</div>
      )}
    </SiteNavigationItem>
  )
}
