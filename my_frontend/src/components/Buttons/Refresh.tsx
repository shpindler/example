import { Btn, BtnProps } from '@/components/Btn'
import { RefreshIcon } from '@/components/Icons/Refresh'
import cn from 'classnames'
import React from 'react'

import style from './Refresh.module.scss'

export interface RefreshBtnProps extends BtnProps {}

export const RefreshBtn: React.FC<RefreshBtnProps> = ({
  className,
  ...otherProps
}) => {
  return (
    <Btn
      className={cn(style.RefreshBtn, className)}
      variant="transparent"
      onClick={() => {
        document.location.reload()
      }}
      {...otherProps}
    >
      <RefreshIcon className={style.RefreshBtn__icon} />
    </Btn>
  )
}
