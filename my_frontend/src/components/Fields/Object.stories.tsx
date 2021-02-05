import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ObjectField, ObjectFieldProps } from './Object'

export default {
  title: 'Fields/Object',
  component: ObjectField,
} as Meta

const Template: Story<ObjectFieldProps> = (args) => <ObjectField {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
