import cn from 'classnames'
import React from 'react'
import {
  OverlayTrigger as BOverlayTrigger,
  Popover as BPopover,
  PopoverProps as BPopoverProps,
} from 'react-bootstrap'
import { createPortal } from 'react-dom'

export interface PopoverProps extends BPopoverProps {}

export interface PopoverContentProps {}

export const Popover = React.forwardRef<HTMLElement, PopoverProps>(
  function Popover_({ children, className, ...otherProps }, ref) {
    return createPortal(
      <BPopover ref={ref} className={cn(className, 'fade')} {...otherProps}>
        {children}
      </BPopover>,
      document.body,
    )
  },
)

export const PopoverContent: React.FC<PopoverContentProps> = function PopoverContent({
  children,
  ...otherProps
}) {
  return <BPopover.Content {...otherProps}>{children}</BPopover.Content>
}

export const OverlayTrigger = BOverlayTrigger
