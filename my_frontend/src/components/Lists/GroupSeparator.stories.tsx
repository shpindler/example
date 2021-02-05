import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ListGroupSeparator, ListGroupSeparatorProps } from './GroupSeparator'

export default {
  title: 'Lists/ListGroupSeparator',
  component: ListGroupSeparator,
} as Meta

const Template: Story<ListGroupSeparatorProps> = (args) => (
  <ListGroupSeparator {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Hello, I am a ListGroupSeparator!',
}
Default.argTypes = {}
