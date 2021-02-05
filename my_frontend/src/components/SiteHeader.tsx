import { ClockDisplay, ClockDisplayProps } from '@/components/ClockDisplay'
import { Grid } from '@/components/Grid'
import { Recommend } from '@/components/Recommend'
import { SiteLogo } from '@/components/SiteLogo'
import { SiteNavigation } from '@/components/SiteNavigation'
import { SiteNavigationItem } from '@/components/SiteNavigationItem'
import { withClockSetter } from '@/components/withClockSetter'
import cn from 'classnames'
import { truncate } from 'lodash'
import React, { useMemo } from 'react'

import style from './SiteHeader.module.scss'

export interface SiteHeaderProps {
  username: string
  timezoneOffset: number
}

const Clock = withClockSetter<'div', ClockDisplayProps>(ClockDisplay)

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  username,
  timezoneOffset,
}) => {
  const timestamp = useMemo(() => {
    return (
      Date.now() - (timezoneOffset - new Date().getTimezoneOffset()) * 60000
    )
  }, [timezoneOffset])

  return (
    <header>
      <Grid.Container>
        <Grid.Row className={style.SiteHeader__content}>
          <Grid.Col xs="auto" className={style.SiteHeader__col}>
            <SiteLogo
              className={style.SiteHeader__logo}
              height={30}
              withLink={false}
            />
          </Grid.Col>
          <Grid.Col xs="auto">
            <Grid.Row>
              <SiteNavigation />
              <SiteNavigationItem
                name={`Выйти (${truncate(username, { length: 25 })})`}
                href="/logout"
                className={style.SiteHeader__link}
              />
              <Recommend />
            </Grid.Row>
          </Grid.Col>
          <Grid.Col
            xs="auto"
            className={cn(style.SiteHeader__clock, 'ml-auto')}
          >
            <Clock timestamp={timestamp} key={timestamp} />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </header>
  )
}
