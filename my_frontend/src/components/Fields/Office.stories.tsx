import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { OfficeField, OfficeFieldProps } from './Office'

export default {
  title: 'Fields/Office',
  component: OfficeField,
} as Meta

const Template: Story<OfficeFieldProps> = (args) => <OfficeField {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
