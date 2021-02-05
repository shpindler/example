import React from 'react'
import { IoMdFingerPrint } from 'react-icons/io'

export interface FingerPrintIconProps {}

export const FingerPrintIcon: React.FC<FingerPrintIconProps> = (props) => {
  return <IoMdFingerPrint {...props} />
}
