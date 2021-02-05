import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { PositionForm, PositionFormProps } from './Position'

export default {
  title: 'Forms/PositionForm',
  component: PositionForm,
} as Meta

const Template: Story<PositionFormProps> = (args) => <PositionForm {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
