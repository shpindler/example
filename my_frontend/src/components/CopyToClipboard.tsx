// Read the docs https://www.npmjs.com/package/react-copy-to-clipboard.
import React from 'react'
import ReactCopyToClipboard, {
  Props as ReactCopyToClipboardProps,
} from 'react-copy-to-clipboard'

export interface CopyToClipboardProps extends ReactCopyToClipboardProps {}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  children,
  ...otherProps
}) => {
  return <ReactCopyToClipboard {...otherProps}>{children}</ReactCopyToClipboard>
}
