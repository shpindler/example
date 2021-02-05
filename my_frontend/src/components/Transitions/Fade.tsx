// To avoid usage of legacy findDOMNode (https://stackoverflow.com/a/61843315)
import { APPEARING_ANIMATION_DURATION } from '@/utils/constants'
import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

export interface FadeTransitionProps
  extends Pick<CSSTransitionProps, 'in' | 'unmountOnExit' | 'nodeRef'> {}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  unmountOnExit = true,
  ...otherProps
}) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={APPEARING_ANIMATION_DURATION}
      classNames="fade"
      unmountOnExit={unmountOnExit}
      {...otherProps}
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  )
}
