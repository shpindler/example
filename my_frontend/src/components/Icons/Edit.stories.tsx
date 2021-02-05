import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { EditIcon, EditIconProps } from './Edit'

export default {
  title: 'Icons/Edit',
  component: EditIcon,
} as Meta

const Template: Story<EditIconProps> = (args) => <EditIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
