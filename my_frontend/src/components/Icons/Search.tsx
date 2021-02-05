import { IconProps } from '@/components/Icons/index'
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'

export interface SearchIconProps
  extends IconProps,
    Omit<React.ComponentProps<'svg'>, keyof IconProps> {}

export const SearchIcon: React.FC<SearchIconProps> = (props) => {
  return <BiSearchAlt {...props} />
}
