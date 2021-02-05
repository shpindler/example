import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { AlternateNameField, AlternateNameFieldProps } from './AlternateName'

export default {
  title: 'Fields/AlternateName',
  component: AlternateNameField,
} as Meta

const Template: Story<AlternateNameFieldProps> = (args) => (
  <AlternateNameField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
