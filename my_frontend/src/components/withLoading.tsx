import { Loading } from '@/components/Loading'
import { LoadingError } from '@/components/LoadingError'
import cn from 'classnames'
import React, { JSXElementConstructor } from 'react'

import style from './withLoading.module.scss'

export interface withLoadingProps {
  error?: string
  isLoading?: boolean
}

export function withLoading<
  Element extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  Props extends { className?: string }
>(Component: React.ComponentType<Props>) {
  return React.forwardRef<Element, Props & withLoadingProps>(
    function ComponentWithLoading(
      { error = '', className, isLoading = false, ...otherProps },
      ref,
    ) {
      if (isLoading) {
        return (
          <article className={cn(style.ComponentWithLoading, className)}>
            <Loading />
          </article>
        )
      } else if (error) {
        return (
          <article className={cn(style.ComponentWithLoading, className)}>
            <LoadingError message={error} />
          </article>
        )
      }
      return (
        <Component {...(otherProps as Props)} ref={ref} className={className} />
      )
    },
  )
}
