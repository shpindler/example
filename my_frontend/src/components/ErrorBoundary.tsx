import { logError } from '@/api/logger'
import { Alert } from '@/components/Alert'
import { RefreshBtn } from '@/components/Buttons/Refresh'
import React, { ErrorInfo } from 'react'

import style from './ErrorBoundary.module.scss'

export interface ErrorBoundaryProps {
  fallback?: JSX.Element
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo): Promise<void> {
    await logError(
      errorInfo.componentStack.split('\n')[1].trim(),
      errorInfo.componentStack,
    )
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Alert className={style.ErrorBoundary}>
            <section className="mb-3">
              Неизвестная ошибка. Попробуйте обновить страницу.
            </section>
            <RefreshBtn />
          </Alert>
        )
      )
    }
    return <>{this.props.children}</>
  }
}
