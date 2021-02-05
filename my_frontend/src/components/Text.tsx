// Read the docs https://github.com/pablosichert/react-truncate.
import cn from 'classnames'
import React, { useState } from 'react'
import Truncate, { TruncateProps } from 'react-truncate'

import style from './Text.module.scss'

export interface TextProps extends TruncateProps {
  Tag?: React.ComponentType<React.HTMLProps<Truncate>>
  isHelp?: boolean
  highlighted?: boolean
}

export const Text: React.FC<TextProps> = ({
  children,
  className,
  lines,
  ellipsis = '...',
  Tag = 'div',
  trimWhitespace = true,
  isHelp = false,
  highlighted = false,
  ...otherProps
}) => {
  const [truncated, setTruncated] = useState(false)
  return lines ? (
    <Truncate
      className={cn(style.Text, className, {
        [style.Text_oneLine]: lines === 1,
        [style.Text_help]: isHelp,
        [style.Text_highlighted]: highlighted,
      })}
      lines={lines}
      ellipsis={ellipsis}
      title={truncated && children ? children.toString() : undefined}
      trimWhitespace={trimWhitespace}
      onTruncate={(isTruncated) => {
        if (truncated !== isTruncated) {
          setTruncated(isTruncated)
        }
      }}
      {...otherProps}
    >
      {children}
    </Truncate>
  ) : (
    <Tag
      className={cn(style.Text, className, {
        [style.Text_help]: isHelp,
        [style.Text_highlighted]: highlighted,
      })}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}
