import { Text } from '@/components/Text'
import React from 'react'

import style from './FieldError.module.scss'

export interface FieldErrorProps {}

export const FieldError: React.FC<FieldErrorProps> = ({ children }) => {
  return (
    <Text className={style.FieldError} lines={1}>
      {children}
    </Text>
  )
}
