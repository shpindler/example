import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { SearchIcon, SearchIconProps } from './Search'

export default {
  title: 'Icons/Search',
  component: SearchIcon,
} as Meta

const Template: Story<SearchIconProps> = (args) => <SearchIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
