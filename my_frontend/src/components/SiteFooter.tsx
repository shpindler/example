import { Grid } from '@/components/Grid.tsx'
import { SiteLink } from '@/components/SiteLink.tsx'
import cn from 'classnames'
import React from 'react'

import style from './SiteFooter.module.scss'

export interface SiteFooterProps {}

const email = 'info@bosscontrol.ru'

export const SiteFooter: React.FC<SiteFooterProps> = () => {
  return (
    <footer className={style.SiteFooter}>
      <Grid.Container className={style.SiteFooter__container}>
        <Grid.Row className="justify-content-between">
          <Grid.Col as="article" xs="auto">
            © 2011-{new Date().getFullYear()}&nbsp;
            <SiteLink
              className={style.SiteFooter__link}
              href="//www.bosscontrol.ru"
            >
              ООО &quot;Биометрические технологии&quot;
            </SiteLink>
          </Grid.Col>
          <Grid.Col xs="auto">
            Нашли ошибку? Напишите нам:&nbsp;
            <SiteLink
              className={cn(style.SiteFooter__link, style.SiteFooter__email)}
              href={`mailto:${email}`}
            >
              {email}
            </SiteLink>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </footer>
  )
}
