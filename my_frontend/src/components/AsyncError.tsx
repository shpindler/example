import { Alert, AlertProps } from '@/components/Alert'
import { Btn } from '@/components/Btn'
import React from 'react'

export interface AsyncErrorProps extends AlertProps {
  message: string
}

export const AsyncErrorContext = React.createContext({
  value: false,
  setValue: () => undefined,
})

export const AsyncError: React.FC<AsyncErrorProps> = ({ message, onClose }) => {
  return (
    <Alert onClose={onClose}>
      <section className="mb-3">{message}</section>
      <Btn onClick={onClose}>Понятно</Btn>
    </Alert>
  )
}
