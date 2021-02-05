import { Overlay } from '@/components/Overlay.tsx'
import cn from 'classnames'
import React, { useEffect } from 'react'
import { MdClose } from 'react-icons/md'

import style from './Alert.module.scss'

export interface AlertProps {
  className?: string
  onClose?: (e?: Event | React.SyntheticEvent) => void
}

const Alert_: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<AlertProps>
> = ({ children, className, onClose, ...otherProps }, ref) => {
  function onKeyDown(e: KeyboardEvent): void {
    e.stopPropagation()
    if (e.key === 'Escape' && onClose) {
      onClose(e)
    }
  }

  useEffect(() => {
    addEventListener('keydown', onKeyDown)
    return () => {
      removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <Overlay ref={ref}>
      <article className={cn(style.Alert, className)} {...otherProps}>
        {onClose && (
          <MdClose
            role="button"
            className={style.Alert__cross}
            onClick={onClose}
          />
        )}
        {children}
      </article>
    </Overlay>
  )
}

export const Alert = React.forwardRef(Alert_)
