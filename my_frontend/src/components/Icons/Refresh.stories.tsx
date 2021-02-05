import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { RefreshIcon, RefreshIconProps } from './Refresh'

export default {
  title: 'Icons/Refresh',
  component: RefreshIcon,
} as Meta

const Template: Story<RefreshIconProps> = (args) => <RefreshIcon {...args} />

export const Default = Template.bind({})
Default.args = {
  style: {
    width: '100px',
    height: '100px',
  },
}
Default.argTypes = {}
