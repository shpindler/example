import linkStyle from '@/components//SiteLink.module.scss'
import { Grid } from '@/components/Grid'
import { SiteLink, SiteLinkProps } from '@/components/SiteLink'
import cn from 'classnames'
import React from 'react'
import { ColProps } from 'react-bootstrap'
import { NavLink, NavLinkProps } from 'react-router-dom'

import style from './SiteNavigationItem.module.scss'

interface BaseSiteNavigationItemProps extends ColProps, SiteLinkProps {
  name?: string
  highlighted?: boolean
}

interface NativeSiteNavigationItemProps extends BaseSiteNavigationItemProps {}

interface ReactSiteNavigationItemProps
  extends BaseSiteNavigationItemProps,
    NavLinkProps {}

export type SiteNavigationItemProps = React.PropsWithoutRef<
  NativeSiteNavigationItemProps & Partial<ReactSiteNavigationItemProps>
>

export const SiteNavigationItem = React.forwardRef<
  HTMLAnchorElement,
  SiteNavigationItemProps
>(function SiteNavigationItem_(
  {
    children,
    name,
    href,
    highlighted = false,
    className,
    xs = 'auto',
    ...otherProps
  },
  ref,
) {
  const baseProps = {
    xs,
    className: cn(
      style.SiteNavigationItem,
      {
        [style.SiteNavigationItem_highlighted]: highlighted,
      },
      className,
    ),
    ...otherProps,
  }
  let Component
  if (href) {
    Component = Grid.Col as React.FC<NativeSiteNavigationItemProps>
    return (
      <Component ref={ref} as={SiteLink} {...baseProps} href={href}>
        {children || name}
      </Component>
    )
  } else {
    Component = Grid.Col as React.FC<Partial<ReactSiteNavigationItemProps>>
    baseProps.className += ` ${linkStyle.SiteLink}`
    return (
      <Component ref={ref} as={NavLink} {...baseProps}>
        {children || name}
      </Component>
    )
  }
})
