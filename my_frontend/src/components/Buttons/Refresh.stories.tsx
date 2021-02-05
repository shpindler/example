import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { RefreshBtn, RefreshBtnProps } from './Refresh'

export default {
  title: 'Buttons/Refresh',
  component: RefreshBtn,
} as Meta

const Template: Story<RefreshBtnProps> = (args) => <RefreshBtn {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
