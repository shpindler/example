import { CopyToClipboard } from '@/components/CopyToClipboard'
import { ActionListItem } from '@/components/ListItems/DeviceEvent/ActionListItem'
import { Text } from '@/components/Text'
import React, { useRef } from 'react'

export interface SaveToClipboardActionListItemProps {
  copyText: string
  onCopy: () => void
}

export const SaveToClipboardActionListItem: React.FC<SaveToClipboardActionListItemProps> = ({
  copyText,
  children,
  onCopy,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)

  function _onCopy() {
    if (!rootRef.current) {
      throw new Error('Ref object is absent.')
    }
    if (onCopy) {
      onCopy()
    }
  }

  return (
    <ActionListItem ref={rootRef}>
      <CopyToClipboard text={copyText} onCopy={_onCopy}>
        <Text highlighted>{children}</Text>
      </CopyToClipboard>
    </ActionListItem>
  )
}
