import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { GroupNameField, GroupNameFieldProps } from './GroupName'

export default {
  title: 'Fields/GroupName',
  component: GroupNameField,
} as Meta

const Template: Story<GroupNameFieldProps> = (args) => (
  <GroupNameField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
