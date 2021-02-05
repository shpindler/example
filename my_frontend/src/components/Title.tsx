import cn from 'classnames'
import React from 'react'

import style from './Title.module.scss'

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface TitleProps {
  level?: TitleLevel
  className?: string
}

export const Title: React.FC<TitleProps> = ({
  level = 1,
  children,
  className,
  ...otherProps
}) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <Component
      className={cn(style.Title, style[`Title_level_${level}`], className)}
      {...otherProps}
    >
      {children}
    </Component>
  )
}
