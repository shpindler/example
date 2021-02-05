import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  GroupOfPositionsField,
  GroupOfPositionsFieldProps,
} from './GroupOfPositions'

export default {
  title: 'Fields/GroupOfPositions',
  component: GroupOfPositionsField,
} as Meta

const Template: Story<GroupOfPositionsFieldProps> = (args) => (
  <GroupOfPositionsField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
