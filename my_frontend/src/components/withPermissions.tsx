import { PermissionDenied } from '@/components/PermissionDenied'
import cn from 'classnames'
import React, { JSXElementConstructor } from 'react'

import style from './withPermissions.module.scss'

export interface withPermissionsProps {
  readable?: boolean
  executable?: boolean
  showPlaceholder?: boolean
}

export function withPermissions<
  Element extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  Props extends { className?: string }
>(Component: React.ComponentType<Props>) {
  return React.forwardRef<Element, Props & withPermissionsProps>(
    function withPermissions_(
      {
        className,
        readable = false,
        executable = false,
        showPlaceholder = false,
        ...otherProps
      },
      ref,
    ) {
      return (
        ((readable || executable) && (
          <Component
            {...(otherProps as Props)}
            ref={ref}
            className={cn(
              style.withPermissions,
              {
                [style.withPermissions_readonly]: readable && !executable,
                [style.withPermissions_executeOnly]: executable && !readable,
              },
              className,
            )}
          />
        )) ||
        (showPlaceholder && <PermissionDenied />) ||
        null
      )
    },
  )
}
