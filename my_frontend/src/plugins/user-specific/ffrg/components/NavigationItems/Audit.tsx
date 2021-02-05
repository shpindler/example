import { AuditNavigationItem } from '@/components/NavigationItems/Audit'
import { SiteNavigationItemProps } from '@/components/SiteNavigationItem'
import { UserContext } from '@/components/User.context'
import React from 'react'

export interface Props extends Partial<SiteNavigationItemProps> {}

export const FfrgAuditNavigationItem: React.FC<Props> = (props) => {
  return (
    <UserContext.Consumer>
      {({ isSupport }) => (
        <AuditNavigationItem highlighted={isSupport} {...props} />
      )}
    </UserContext.Consumer>
  )
}
