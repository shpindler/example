import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  RemovePositionConfirmation,
  RemovePositionConfirmationProps,
} from './Position'

export default {
  title: 'RemoveConfirmations/Position',
  component: RemovePositionConfirmation,
} as Meta

const Template: Story<RemovePositionConfirmationProps> = (args) => (
  <RemovePositionConfirmation {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
