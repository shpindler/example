import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteNavigationItemProps } from '@/components/SiteNavigationItem'
import { UserContext } from '@/components/User.context'
import cn from 'classnames'
import React from 'react'

import style from './PageLayout.module.scss'

export interface PageLayoutProps {
  metaTitle?: string
  links?: SiteNavigationItemProps[]
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <UserContext.Consumer>
        {({ username, timezoneOffset }) => (
          <SiteHeader username={username} timezoneOffset={timezoneOffset} />
        )}
      </UserContext.Consumer>
      <main className={cn(style.PageLayout__main, 'my-1')}>{children}</main>
      <SiteFooter />
    </>
  )
}
