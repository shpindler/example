import React from 'react'
import { AiOutlineFileText } from 'react-icons/ai'

export interface FileIconProps {}

export const FileIcon: React.FC<FileIconProps> = (props) => {
  return <AiOutlineFileText {...props} />
}
