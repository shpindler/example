import { SiteLink, SiteLinkProps } from '@/components/SiteLink'
import React from 'react'

import style from './Recommend.module.scss'

export interface RecommendProps extends SiteLinkProps {}

export const Recommend: React.FC<RecommendProps> = () => {
  const title = 'Подарок за рекомендацию'

  return (
    <SiteLink
      className={style.Recommend}
      href="/timeattendance/recommend/"
      title={title}
    >
      {title}
    </SiteLink>
  )
}
