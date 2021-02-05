import cn from 'classnames'
import React from 'react'

import style from './FieldLabel.module.scss'

export interface FieldLabelProps extends React.ComponentProps<'label'> {
  isInvalid?: boolean
  required?: boolean
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  children,
  className,
  isInvalid,
  required,
  ...otherProps
}) => {
  return (
    <label
      className={cn(style.FieldLabel, className, {
        [style.FieldLabel_invalid]: isInvalid,
        [style.FieldLabel_required]: required,
      })}
      {...otherProps}
    >
      {children}
    </label>
  )
}
