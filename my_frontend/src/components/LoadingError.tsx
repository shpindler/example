import style from '@/components/Loading.module.scss'
import React from 'react'

export interface LoadingErrorProps {
  message?: string
}

export const LoadingError: React.FC<LoadingErrorProps> = ({
  children,
  message = 'Ошибка загрузки',
}) => {
  return (
    <article className={style.Loading}>
      <div className={style.Loading__error}>{message}</div>
      {children}
    </article>
  )
}
