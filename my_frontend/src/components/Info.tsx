import { WarningIcon } from '@/components/Icons/Warning'
import { InfoMessageType } from '@/models/info-message'
import cn from 'classnames'
import React from 'react'

import style from './Info.module.scss'

export interface InfoProps extends React.ComponentProps<'div'> {
  type: InfoMessageType
  header: string
  content: string
}

export const Info: React.FC<InfoProps> = ({
  type,
  header,
  content,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={cn(style.Info, className, {
        [style.Info_type_warning]: type === InfoMessageType.WARNING,
        [style.Info_type_error]: type === InfoMessageType.ERROR,
      })}
      {...otherProps}
    >
      <WarningIcon className={cn(style.Info__icon, 'mr-2')} />
      <div>
        <div className={style.Info__header}>{header}</div>
        <div className={style.Info__content}>{content}</div>
      </div>
    </div>
  )
}
