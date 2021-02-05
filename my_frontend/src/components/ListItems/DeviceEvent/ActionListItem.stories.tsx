import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ActionListItem, ActionListItemProps } from './ActionListItem'

export default {
  title: 'ListItems/DeviceEvent/ActionListItem',
  component: ActionListItem,
} as Meta

const Template: Story<ActionListItemProps> = (args) => (
  <ActionListItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'I am ActionListItem',
}
Default.argTypes = {}
