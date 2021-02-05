import cn from 'classnames'
import React from 'react'

import style from './Image.module.scss'

export type ImageProps = React.ComponentPropsWithRef<'img'> & {
  contain?: boolean
  lazy?: boolean
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function Image_(
    { className, contain = false, lazy = true, alt = '', ...otherProps },
    ref,
  ) {
    return (
      <img
        ref={ref}
        loading={lazy ? 'lazy' : undefined}
        alt={alt}
        className={cn(className, style.Image, {
          [style.Image_contain]: contain,
        })}
        {...otherProps}
      />
    )
  },
)
