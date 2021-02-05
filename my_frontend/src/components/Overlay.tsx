import cn from 'classnames'
import React from 'react'
import { createPortal } from 'react-dom'

import style from './Overlay.module.scss'

export interface OverlayProps extends React.ComponentProps<'div'> {
  transparent?: boolean
}

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay_(
    { children, className, transparent = false, ...otherProps },
    ref,
  ) {
    return createPortal(
      <div
        ref={ref}
        className={cn(style.Overlay, className, 'fade', {
          [style.Overlay_transparent]: transparent,
        })}
        {...otherProps}
      >
        {children}
      </div>,
      document.getElementById('root') as HTMLElement,
    )
  },
)
