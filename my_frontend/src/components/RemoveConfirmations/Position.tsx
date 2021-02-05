import { destroyPosition } from '@/api/positions'
import {
  RemoveConfirmation,
  RemoveConfirmationProps,
} from '@/components/RemoveConfirmation'
import { Position } from '@/models/position'
import React from 'react'

export interface RemovePositionConfirmationProps
  extends Omit<RemoveConfirmationProps<typeof Position>, 'service' | 'Model'> {}

export const RemovePositionConfirmation: React.FC<RemovePositionConfirmationProps> = ({
  title = 'Удалить должность?',
  ...otherProps
}) => {
  return (
    <RemoveConfirmation
      data-test-id="position-delete-form"
      title={title}
      service={destroyPosition}
      Model={Position}
      {...otherProps}
    />
  )
}
