import cn from 'classnames'
import React from 'react'

import style from './Hamburger.module.scss'

export interface HamburgerProps {
  isOpened?: boolean
  className?: string
  lineClassName?: string
  onClick?: () => void
}

export const Hamburger: React.FC<HamburgerProps> = ({
  isOpened = false,
  className,
  lineClassName,
  ...otherProps
}) => {
  return (
    <div
      className={cn(style.Hamburger, className, {
        [style.Hamburger_opened]: isOpened,
      })}
      {...otherProps}
    >
      <div className={cn(style.Hamburger__line, lineClassName)} />
      <div className={cn(style.Hamburger__line, lineClassName)} />
      <div className={cn(style.Hamburger__line, lineClassName)} />
    </div>
  )
}
