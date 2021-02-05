import { SiteLink } from '@/components/SiteLink.tsx'
import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import style from './Btn.module.scss'

export type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: string
    passHref?: boolean
    fluid?: boolean
  }

const Content = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  BtnProps
>(function Content_(
  { className, variant = 'gray', fluid = false, children, ...otherProps },
  ref,
) {
  const Component = otherProps.href ? SiteLink : 'button'

  return (
    <Component
      ref={ref}
      className={cn(className, style.Btn, {
        [style[`Btn_variant_${variant}`]]: variant,
        [style.Btn_fluid]: fluid,
      })}
      {...otherProps}
    >
      {children}
    </Component>
  )
})

export const Btn = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  BtnProps
>(function Btn_({ href, ...otherProps }, ref) {
  return href ? (
    <Link to={href}>
      <Content ref={ref} {...{ href, ...otherProps }} />
    </Link>
  ) : (
    <Content ref={ref} {...otherProps} />
  )
})
