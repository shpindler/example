import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  LatestDeviceEventsList,
  LatestDeviceEventsListProps,
} from './LatestDeviceEvents'

export default {
  title: 'Lists/LatestDeviceEventsList',
  component: LatestDeviceEventsList,
} as Meta

const Template: Story<LatestDeviceEventsListProps> = (args) => (
  <LatestDeviceEventsList {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
