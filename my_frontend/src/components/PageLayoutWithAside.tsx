import { Grid } from '@/components/Grid'
import cn from 'classnames'
import React from 'react'

import style from './PageLayoutWithAside.module.scss'

export interface PageLayoutWithAsideProps {
  asideMenu?: JSX.Element
}

export const PageLayoutWithAside: React.FC<PageLayoutWithAsideProps> = ({
  asideMenu,
  children,
}) => {
  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Col
          as="aside"
          xs="auto"
          className={cn(style.PageLayout__col, 'mr-1')}
        >
          <Grid.Row>{asideMenu}</Grid.Row>
        </Grid.Col>
        <Grid.Col className={cn(style.PageLayout__col, 'py-4')}>
          {children}
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  )
}
