import {
  SiteNavigationAsideItem,
  SiteNavigationAsideItemProps,
} from '@/components/SiteNavigationAsideItem'
import React from 'react'

export interface AuditNavigationItemProps
  extends Partial<SiteNavigationAsideItemProps> {}

export const AuditNavigationItem: React.FC<AuditNavigationItemProps> = ({
  name = 'История изменений',
  href = '/timeattendance/audit/',
  ...otherProps
}) => {
  return <SiteNavigationAsideItem name={name} href={href} {...otherProps} />
}
