import LogoImage from '@/assets/img/site-logo.svg'
import { Image } from '@/components/Image'
import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import style from './SiteLogo.module.scss'

export interface SiteLogoProps extends React.ComponentProps<'img'> {
  className?: string
  withLink?: boolean
}

const Content = ({ className = '', ...otherProps }) => {
  return (
    <Image
      className={cn(style.SiteLogo, className)}
      src={LogoImage}
      alt="БОСС Контроль"
      {...otherProps}
    />
  )
}

export const SiteLogo: React.FC<SiteLogoProps> = ({
  withLink = true,
  ...otherProps
}) => {
  return withLink ? (
    <Link to="/">
      <a href="/" className="d-block">
        <Content {...otherProps} />
      </a>
    </Link>
  ) : (
    <Content {...otherProps} />
  )
}
