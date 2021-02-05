import cn from 'classnames'
import React from 'react'

import style from './SiteLink.module.scss'

export interface SiteLinkProps extends React.ComponentProps<'a'> {
  underlined?: boolean
}

export const SiteLink = React.forwardRef<HTMLAnchorElement, SiteLinkProps>(
  function SiteLink_(
    { children, className, underlined = false, ...otherProps },
    ref,
  ) {
    return (
      <a
        className={cn(className, style.SiteLink, {
          [style.SiteLink_underlined]: underlined,
        })}
        {...otherProps}
        ref={ref}
      >
        {children}
      </a>
    )
  },
)
