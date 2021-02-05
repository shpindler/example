import React from 'react'
import { CgPassword } from 'react-icons/cg'

export interface PasswordIconProps {}

export const PasswordIcon: React.FC<PasswordIconProps> = (props) => {
  return <CgPassword {...props} />
}
