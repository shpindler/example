import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { PositionsList } from './Positions'

export default {
  title: 'Lists/Positions',
  component: PositionsList,
} as Meta

const Template: Story = (args) => <PositionsList {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {
  isDisabled: {
    control: 'boolean',
  },
  isLoading: {
    control: 'boolean',
  },
}
