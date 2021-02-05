import React from 'react'
import { BiFace } from 'react-icons/bi'

export interface FaceIconProps {}

export const FaceIcon: React.FC<FaceIconProps> = (props) => {
  return <BiFace {...props} />
}
