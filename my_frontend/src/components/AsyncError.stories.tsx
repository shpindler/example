import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { AsyncError, AsyncErrorProps } from './AsyncError'

export default {
  title: 'AsyncError',
  component: AsyncError,
} as Meta

const Template: Story<AsyncErrorProps> = (args) => <AsyncError {...args} />

export const Default = Template.bind({})
