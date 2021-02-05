import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  DynamicComponentLoading,
  DynamicComponentLoadingProps,
} from './DynamicComponentLoading'

export default {
  title: 'DynamicComponentLoading',
  component: DynamicComponentLoading,
  argTypes: {
    isLoading: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
  },
} as Meta

const Template: Story<DynamicComponentLoadingProps> = (args) => (
  <DynamicComponentLoading {...args} />
)

export const WhileLoading = Template.bind({})
WhileLoading.args = {
  isLoading: true,
}
export const WhileError = Template.bind({})
WhileError.args = {
  isLoading: false,
  error: new Error('Unexpected error'),
}
