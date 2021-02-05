import React from 'react'
import { FiExternalLink } from 'react-icons/fi'

export interface ExternalIconProps {}

export const ExternalIcon: React.FC<ExternalIconProps> = (props) => {
  return <FiExternalLink {...props} />
}
