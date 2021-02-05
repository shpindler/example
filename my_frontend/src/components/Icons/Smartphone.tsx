import React from 'react'
import { MdSmartphone } from 'react-icons/md'

export interface SmartphoneIconProps {}

export const SmartphoneIcon: React.FC<SmartphoneIconProps> = (props) => {
  return <MdSmartphone {...props} />
}
