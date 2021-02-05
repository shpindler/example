import { SpinnerIcon } from '@/components/Icons/Spinner'
import React from 'react'

import style from './Loading.module.scss'

export interface LoadingProps {
  noText?: boolean
}

export const Loading: React.FC<LoadingProps> = ({
  children = 'Загрузка...',
  noText = false,
}) => {
  return (
    <article className={style.Loading}>
      <SpinnerIcon className={style.Loading__icon} />
      {!noText && <span className={style.Loading__text}>{children}</span>}
    </article>
  )
}
