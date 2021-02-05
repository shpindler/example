import React from 'react'
import { FaQuestion } from 'react-icons/fa'

export interface QuestionIconProps {}

export const QuestionIcon: React.FC<QuestionIconProps> = (props) => {
  return <FaQuestion {...props} />
}
